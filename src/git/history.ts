import simpleGit from 'simple-git';
import {
    Framework,
    GitFileChange,
    CommitHistory,
    SpecHistoryEntry,
    TestChange,
    HistoryError,
    HistoryBuildResult,
    DetectionResult,
} from '../types';
import { extractTestNamesFromContent, extractTestsWithLinesFromContent, isFrameworkSpecFile } from '../core/parser';
import { isSameTest } from '../core/frameworks/testDiff';
import { matchesDirectoryPattern, normaliseRepoPath, pathPatternRoot, pathPatternSpecificity } from '../core/pathPatterns';

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the hash of the most recent commit, or null if no history exists.
 */
export async function getLatestCommitHash(projectPath: string): Promise<string | null> {
    const git = simpleGit(projectPath);
    try {
        const log = await git.log({ maxCount: 1 });
        return log.latest?.hash ?? null;
    } catch {
        return null;
    }
}

/**
 * Returns the commit hash at the tip of `origin/<branch>`, or null if the
 * remote ref cannot be resolved (e.g. no remote configured).
 */
export async function getRemoteBranchTip(projectPath: string, branch: string): Promise<string | null> {
    const git = simpleGit(projectPath);
    try {
        const hash = await git.raw(['rev-parse', `origin/${branch}`]);
        return hash.trim() || null;
    } catch {
        return null;
    }
}

/**
 * Normalises a git remote URL to a clean HTTPS URL without a trailing `.git`.
 * Supports SSH (`git@github.com:owner/repo.git`) and HTTPS forms.
 * Returns null when the URL cannot be parsed or belongs to an unrecognised host.
 */
export function normaliseRemoteUrl(raw: string): string | null {
    const trimmed = raw.trim();

    // SSH form: git@hostname:owner/repo[.git]
    const sshMatch = trimmed.match(/^git@([^:]+):(.+?)(?:\.git)?$/);
    if (sshMatch) {
        return `https://${sshMatch[1]}/${sshMatch[2]}`;
    }

    // HTTPS form: strip trailing .git and slash
    if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
        return trimmed.replace(/\.git$/, '').replace(/\/$/, '');
    }

    return null;
}

/**
 * Attempts to read the `origin` remote URL from the git repository at
 * `projectPath` and returns a normalised HTTPS URL.
 * Returns null if the remote cannot be found or the URL is unrecognised.
 */
export async function getRepoUrl(projectPath: string): Promise<string | null> {
    const git = simpleGit(projectPath);
    try {
        const remotes = await git.getRemotes(true);
        const origin = remotes.find((r) => r.name === 'origin');
        const raw = origin?.refs?.fetch || origin?.refs?.push;
        if (!raw) return null;
        return normaliseRemoteUrl(raw);
    } catch {
        return null;
    }
}

/**
 * Resolves the name of the default remote branch (e.g. "main", "master").
 * First attempts to read `origin/HEAD` via `git symbolic-ref`; if that fails,
 * it probes whether `origin/main` or `origin/master` exist. Falls back to
 * "main" as a safe default.
 */
export async function getDefaultBranch(projectPath: string): Promise<string> {
    const git = simpleGit(projectPath);
    try {
        const ref = await git.raw(['symbolic-ref', 'refs/remotes/origin/HEAD']);
        // ref looks like "refs/remotes/origin/main\n"
        const match = ref.trim().match(/^refs\/remotes\/origin\/(.+)$/);
        if (match) return match[1];
    } catch {
        // symbolic-ref not set — probe common branch names
    }
    for (const candidate of ['main', 'master']) {
        try {
            await git.raw(['rev-parse', '--verify', `origin/${candidate}`]);
            return candidate;
        } catch {
            // not found, try next
        }
    }
    return 'main';
}

/**
 * Builds the full commit history across all configured framework test directories.
 * If `sinceCommit` is provided, only commits after that hash are returned.
 * If `fullHistory` is true, scans all commits reachable from the default branch.
 * Only commits reachable from `origin/<defaultBranch>` are ever included so
 * that unmerged feature-branch commits are not surfaced.
 *
 * Returns both the history entries and any errors encountered during processing.
 */
export async function buildHistory(
    projectPath: string,
    frameworkConfigs: DetectionResult[],
    defaultBranch: string,
    sinceCommit?: string,
    fullHistory?: boolean,
    sinceDate?: Date,
): Promise<HistoryBuildResult> {
    const git = simpleGit(projectPath);
    const errors: HistoryError[] = [];
    const warnings: string[] = [];

    const remoteRef = `origin/${defaultBranch}`;

    const testDirPatterns = frameworkConfigs
        .filter((c) => c.framework !== 'unknown')
        .map((c) => normaliseRepoPath(c.testDir));
    const pathspecRoots = [...new Set(testDirPatterns.map(pathPatternRoot))];
    const gitPathspecs = pathspecRoots.every((root): root is string => root !== null) ? pathspecRoots : [];

    let logArgs: string[];

    if (sinceCommit) {
        logArgs =
            gitPathspecs.length > 0
                ? [`${sinceCommit}..${remoteRef}`, '--', ...gitPathspecs]
                : [`${sinceCommit}..${remoteRef}`];
    } else if (fullHistory) {
        logArgs = [remoteRef];
    } else {
        logArgs = gitPathspecs.length > 0 ? [remoteRef, '--', ...gitPathspecs] : [remoteRef];
    }

    // For first syncs (no sinceCommit), cap how far back we look
    if (sinceDate && !sinceCommit) {
        logArgs = [`--since=${sinceDate.toISOString()}`, ...logArgs];
    }

    // Single git log call returns commit metadata + file changes in one shot,
    // eliminating N individual diff-tree subprocess calls.
    let commits: CommitWithFiles[];
    try {
        commits = await fetchCommitsWithFiles(git, logArgs, fullHistory ? [] : testDirPatterns);
    } catch (error) {
        if (error instanceof Error) {
            warnings.push(`Git log failed: ${error.message}`);
        }
        return { entries: [], errors, warnings };
    }

    if (commits.length === 0) {
        return { entries: [], errors, warnings };
    }

    console.log(`[sync] Processing ${commits.length} commits.`);

    // Report roughly 20 times across the full run, minimum every 50 commits
    const BATCH_SIZE = 20;
    const PROGRESS_REPORT_COUNT = 20;
    const MIN_REPORT_INTERVAL = 50;
    const reportEvery = Math.max(MIN_REPORT_INTERVAL, Math.floor(commits.length / PROGRESS_REPORT_COUNT));

    // Process commits in parallel batches — preserving index order for timeline integrity
    const slots: (CommitHistory | null)[] = new Array(commits.length).fill(null);
    let processed = 0;

    for (let batchStart = 0; batchStart < commits.length; batchStart += BATCH_SIZE) {
        const batch = commits.slice(batchStart, batchStart + BATCH_SIZE);

        const batchResults = await Promise.all(
            batch.map(async (commit, batchIdx) => {
                const slotIdx = batchStart + batchIdx;
                try {
                    const specChanges = await buildSpecChanges(
                        git,
                        commit.hash,
                        commit.fileChanges,
                        frameworkConfigs,
                        projectPath,
                        errors,
                    );

                    if (specChanges.length === 0) return { slotIdx, entry: null };

                    return {
                        slotIdx,
                        entry: {
                            commit: {
                                hash: commit.hash,
                                shortHash: commit.hash.substring(0, 7),
                                message: commit.message,
                                author: commit.author,
                                date: new Date(commit.date).toISOString(),
                                changes: commit.fileChanges,
                            },
                            specs: specChanges,
                        } as CommitHistory,
                    };
                } catch (error) {
                    errors.push({
                        commit: commit.hash,
                        file: 'unknown',
                        reason: error instanceof Error ? error.message : 'Unknown error',
                        partial: true,
                    });
                    return { slotIdx, entry: null };
                }
            }),
        );

        for (const { slotIdx, entry } of batchResults) {
            slots[slotIdx] = entry;
        }

        const prevProcessed = processed;
        processed += batch.length;

        // Report progress when we cross a reporting threshold or finish
        if (
            Math.floor(prevProcessed / reportEvery) !== Math.floor(processed / reportEvery) ||
            processed >= commits.length
        ) {
            console.log(`[sync]   ${processed}/${commits.length} commits processed.`);
        }
    }

    const entries = slots.filter((e): e is CommitHistory => e !== null);

    return { entries, errors, warnings };
}

// ─── File change detection ────────────────────────────────────────────────────

// Unique sentinels used to delimit commits and fields in raw git log output.
// Must not appear in commit messages or file paths.
const COMMIT_SEP = '<<<COMMIT>>>';
const FIELD_SEP = '<<<F>>>';

interface CommitWithFiles {
    hash: string;
    author: string;
    date: string;
    message: string;
    fileChanges: GitFileChange[];
}

/**
 * Fetches all commits in the given log range together with their per-file change
 * status in a single git process call, replacing the previous N+1 diff-tree pattern.
 */
async function fetchCommitsWithFiles(
    git: ReturnType<typeof simpleGit>,
    logArgs: string[],
    testDirs: string[],
): Promise<CommitWithFiles[]> {
    const raw = await git.raw([
        'log',
        `--format=${COMMIT_SEP}%H${FIELD_SEP}%an${FIELD_SEP}%ai${FIELD_SEP}%s`,
        '--name-status',
        '--diff-filter=ADRM',
        '-M',
        ...logArgs,
    ]);

    if (!raw.trim()) return [];

    const result: CommitWithFiles[] = [];
    const blocks = raw.split(COMMIT_SEP).filter(Boolean);

    for (const block of blocks) {
        const lines = block.split('\n');
        const [hash, author, date, ...msgParts] = lines[0].split(FIELD_SEP);
        const message = msgParts.join(FIELD_SEP);

        if (!hash?.trim()) continue;

        const fileChanges: GitFileChange[] = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line || !line.trim()) continue;

            const parts = line.split('\t');
            const status = parts[0];

            if (status.startsWith('R')) {
                const oldPath = parts[1];
                const newPath = parts[2];
                if (!newPath) continue;
                if (!testDirs.length || isInAnyTestDir(newPath, testDirs) || isInAnyTestDir(oldPath, testDirs)) {
                    fileChanges.push({ path: newPath.trim(), oldPath: oldPath.trim(), status: 'renamed' });
                }
            } else {
                const filePath = parts[1];
                if (!filePath) continue;
                if (testDirs.length && !isInAnyTestDir(filePath.trim(), testDirs)) continue;
                const mapped = mapGitStatus(status);
                if (mapped) fileChanges.push({ path: filePath.trim(), status: mapped });
            }
        }

        // Skip commits with no relevant file changes (e.g. only type/permission changes)
        if (fileChanges.length > 0) {
            result.push({
                hash: hash.trim(),
                author: author ?? '',
                date: date ?? '',
                message: message ?? '',
                fileChanges,
            });
        }
    }

    return result.reverse(); // oldest first for timeline ordering
}

function isInTestDir(filePath: string, testDir: string): boolean {
    return matchesDirectoryPattern(filePath, testDir);
}

function isInAnyTestDir(filePath: string, testDirs: string[]): boolean {
    return testDirs.some((dir) => isInTestDir(filePath, dir));
}

/**
 * Resolves the framework for a given file path by finding the most specific
 * (longest) matching testDir across all framework configs.
 * Returns null if the file does not belong to any configured test directory.
 */
export function resolveFrameworkForFile(filePath: string, frameworkConfigs: DetectionResult[]): Framework | null {
    let bestMatch: { framework: Framework; testDirLength: number } | null = null;

    for (const { framework, testDir } of frameworkConfigs) {
        if (framework === 'unknown') continue;
        const normalised = normaliseRepoPath(testDir);
        if (isInTestDir(filePath, normalised)) {
            const specificity = pathPatternSpecificity(normalised);
            if (!bestMatch || specificity > bestMatch.testDirLength) {
                bestMatch = { framework, testDirLength: specificity };
            }
        }
    }

    return bestMatch?.framework ?? null;
}

function mapGitStatus(status: string): GitFileChange['status'] | null {
    switch (status[0]) {
        case 'A':
            return 'added';
        case 'D':
            return 'deleted';
        case 'M':
            return 'changed';
        default:
            return null;
    }
}

// ─── Test-level change detection ──────────────────────────────────────────────

async function buildSpecChanges(
    git: ReturnType<typeof simpleGit>,
    hash: string,
    fileChanges: GitFileChange[],
    frameworkConfigs: DetectionResult[],
    projectPath: string,
    errors: HistoryError[],
): Promise<SpecHistoryEntry[]> {
    const entries: SpecHistoryEntry[] = [];

    for (const change of fileChanges) {
        // Resolve which framework owns this file based on its path
        const framework = resolveFrameworkForFile(change.path, frameworkConfigs);
        if (!framework || !isSpecFile(change.path, framework)) continue;

        // Normalize cross-testDir renames: if a spec file moves between tracked
        // directories (or into/out of a tracked directory), treat it as an add/delete.
        let effectiveChange = change;
        if (change.status === 'renamed' && change.oldPath) {
            const oldFramework = resolveFrameworkForFile(change.oldPath, frameworkConfigs);
            const newFramework = resolveFrameworkForFile(change.path, frameworkConfigs);
            if (!oldFramework && newFramework) {
                effectiveChange = { path: change.path, status: 'added' };
            } else if (oldFramework && !newFramework) {
                effectiveChange = { path: change.oldPath, status: 'deleted' };
            }
        }

        try {
            const entry = await buildSpecEntry(git, hash, effectiveChange, framework, projectPath);
            if (entry) entries.push(entry);
        } catch (error) {
            errors.push({
                commit: hash,
                file: change.path,
                reason: error instanceof Error ? error.message : 'Unknown error',
                partial: true,
            });
        }
    }

    return entries;
}

async function buildSpecEntry(
    git: ReturnType<typeof simpleGit>,
    hash: string,
    change: GitFileChange,
    framework: Framework,
    _projectPath: string,
): Promise<SpecHistoryEntry | null> {
    if (change.status === 'added') {
        const content = await getFileAtCommit(git, hash, change.path);
        const tests = extractTestNamesFromContent(content, framework);
        if (tests.length === 0) return null;
        return {
            specPath: change.path,
            fileStatus: 'added',
            framework,
            changes: tests.map((name) => ({ type: 'added', name })),
        };
    }

    if (change.status === 'deleted') {
        const content = await getFileAtCommit(git, `${hash}^`, change.path);
        const tests = extractTestNamesFromContent(content, framework);
        if (tests.length === 0) return null;
        return {
            specPath: change.path,
            fileStatus: 'deleted',
            framework,
            changes: tests.map((name) => ({ type: 'deleted', name })),
        };
    }

    if (change.status === 'renamed' && change.oldPath) {
        const [currentContent, previousContent] = await Promise.all([
            getFileAtCommit(git, hash, change.path),
            getFileAtCommit(git, `${hash}^`, change.oldPath).catch(() => ''),
        ]);

        const currentTests = new Set(extractTestNamesFromContent(currentContent, framework));
        const previousTests = new Set(extractTestNamesFromContent(previousContent, framework));

        const testChanges = diffTestNames(previousTests, currentTests);
        if (testChanges.length === 0) return null;

        return {
            specPath: change.path,
            fileStatus: 'renamed',
            framework,
            changes: testChanges,
        };
    }

    // Changed file — diff test names between current and parent
    const [current, previous] = await Promise.all([
        getFileAtCommit(git, hash, change.path),
        getFileAtCommit(git, `${hash}^`, change.path).catch(() => ''),
    ]);

    const currentTests = new Set(extractTestNamesFromContent(current, framework));
    const previousTests = new Set(extractTestNamesFromContent(previous, framework));

    const changes = diffTestNames(previousTests, currentTests);
    const maintenanceChanges = detectMaintenanceChanges(previous, current, framework, changes);
    const allChanges = [...changes, ...maintenanceChanges];
    if (allChanges.length === 0) return null;

    return {
        specPath: change.path,
        fileStatus: 'changed',
        framework,
        changes: allChanges,
    };
}

// ─── Utilities ────────────────────────────────────────────────────────────────

async function getFileAtCommit(git: ReturnType<typeof simpleGit>, ref: string, filePath: string): Promise<string> {
    return git.show([`${ref}:${filePath}`]);
}

/**
 * Returns true if the file looks like a spec file for the given framework.
 * Delegates to the parser registry's filePatterns so this stays in sync
 * automatically whenever a new framework is added.
 */
function isSpecFile(filePath: string, framework?: Framework): boolean {
    if (!framework) return /\.(spec|test)\.[jt]s$/.test(filePath);
    return isFrameworkSpecFile(filePath, framework);
}

/**
 * Detects maintenance changes: tests whose names are stable between two versions
 * but whose body content has changed.
 */
function detectMaintenanceChanges(
    previousContent: string,
    currentContent: string,
    framework: Framework,
    alreadyChangedTests: TestChange[],
): TestChange[] {
    if (!previousContent || !currentContent) return [];

    const prevTests = extractTestsWithLinesFromContent(previousContent, framework);
    const currTests = extractTestsWithLinesFromContent(currentContent, framework);

    if (prevTests.length === 0 || currTests.length === 0) return [];

    // Names that appear in both versions (not added, deleted, or renamed)
    const alreadyChangedNames = new Set(
        alreadyChangedTests.flatMap((c) => (c.oldName ? [c.name, c.oldName] : [c.name])),
    );
    const prevNames = new Set(prevTests.map((t) => t.name));
    const currNames = new Set(currTests.map((t) => t.name));
    const stableNames = [...currNames].filter((name) => prevNames.has(name) && !alreadyChangedNames.has(name));

    if (stableNames.length === 0) return [];

    const prevLines = previousContent.split('\n');
    const currLines = currentContent.split('\n');

    /**
     * Returns the line slice representing the body of a test.
     * The span is from the test's start line to one line before the next test (or EOF).
     */
    function getTestSpan(tests: { name: string; line: number }[], name: string, lines: string[]): string {
        const sorted = [...tests].sort((a, b) => a.line - b.line);
        const idx = sorted.findIndex((t) => t.name === name);
        if (idx === -1) return '';
        const start = sorted[idx].line - 1; // 0-indexed
        const end = idx + 1 < sorted.length ? sorted[idx + 1].line - 1 : lines.length;
        return lines.slice(start, end).join('\n');
    }

    const results: TestChange[] = [];
    for (const name of stableNames) {
        const prevSpan = getTestSpan(prevTests, name, prevLines);
        const currSpan = getTestSpan(currTests, name, currLines);
        if (prevSpan !== currSpan) {
            results.push({ type: 'maintenance', name });
        }
    }
    return results;
}

/**
 * Diffs two sets of test names.
 * Uses Levenshtein distance-based similarity (85%+ threshold) to detect renames.
 * This is significantly more accurate than word-overlap similarity.
 */
function diffTestNames(previous: Set<string>, current: Set<string>): TestChange[] {
    const added = [...current].filter((t) => !previous.has(t));
    const removed = [...previous].filter((t) => !current.has(t));
    const changes: TestChange[] = [];

    const matchedAdded = new Set<string>();

    for (const removedName of removed) {
        const renameCandidate = added.find(
            (addedName) => !matchedAdded.has(addedName) && isSameTest(removedName, addedName),
        );

        if (renameCandidate) {
            changes.push({ type: 'renamed', name: renameCandidate, oldName: removedName });
            matchedAdded.add(renameCandidate);
        } else {
            changes.push({ type: 'deleted', name: removedName });
        }
    }

    for (const addedName of added) {
        if (!matchedAdded.has(addedName)) {
            changes.push({ type: 'added', name: addedName });
        }
    }

    return changes;
}
