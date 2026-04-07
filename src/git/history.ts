import simpleGit from 'simple-git';
import path from 'path';
import {
    Framework,
    GitFileChange,
    CommitHistory,
    SpecHistoryEntry,
    TestChange,
    HistoryError,
    HistoryBuildResult,
} from '../types';
import { extractTestNamesFromContent, extractTestsWithLinesFromContent } from '../core/parser';
import { isSameTest } from '../core/frameworks/testDiff';

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
 * Builds the full commit history for the given test directory.
 * If `sinceCommit` is provided, only commits after that hash are returned.
 */
/**
 * Builds the full commit history for the given test directory.
 * If `sinceCommit` is provided, only commits after that hash are returned.
 * If `fullHistory` is true, scans all commits in the repo (for projects that moved tests).
 *
 * Returns both the history entries and any errors encountered during processing.
 */
export async function buildHistory(
    projectPath: string,
    testDir: string,
    framework: Framework,
    sinceCommit?: string,
    fullHistory?: boolean,
): Promise<HistoryBuildResult> {
    const git = simpleGit(projectPath);
    const relativeTestDir = testDir.replace(/^\.\//, '');
    const errors: HistoryError[] = [];
    const warnings: string[] = [];

    let logArgs: string[];

    if (sinceCommit) {
        // For incremental sync: explicitly specify range and path
        logArgs = [`${sinceCommit}..HEAD`, '--', relativeTestDir];
    } else if (fullHistory) {
        // For full history scan: get ALL commits in the repo
        // The filtering by test files will happen in buildSpecChanges
        logArgs = ['--all'];
    } else {
        // For standard full sync: get all commits affecting the path
        logArgs = ['--all', '--', relativeTestDir];
    }

    let logResult;
    try {
        logResult = await git.log(logArgs);
    } catch (error) {
        // Log the error for debugging
        if (error instanceof Error) {
            console.error(`[DEBUG] Git log error: ${error.message} with args: ${JSON.stringify(logArgs)}`);
            warnings.push(`Git log failed: ${error.message}`);
        }
        return { entries: [], errors, warnings };
    }

    const commits = [...logResult.all].reverse(); // oldest first for timeline ordering
    const entries: CommitHistory[] = [];

    for (const commit of commits) {
        try {
            // When doing full history, don't filter by testDir in getCommitFileChanges
            // Instead let buildSpecChanges filter to only test files
            const fileChanges = await getCommitFileChanges(git, commit.hash, fullHistory ? undefined : relativeTestDir);
            const specChanges = await buildSpecChanges(
                git,
                commit.hash,
                fileChanges,
                framework,
                projectPath,
                errors,
                fullHistory ? undefined : relativeTestDir,
            );

            if (specChanges.length === 0) continue;

            entries.push({
                commit: {
                    hash: commit.hash,
                    shortHash: commit.hash.substring(0, 7),
                    message: commit.message,
                    author: commit.author_name,
                    date: new Date(commit.date).toISOString(),
                    changes: fileChanges,
                },
                specs: specChanges,
            });
        } catch (error) {
            errors.push({
                commit: commit.hash,
                file: 'unknown',
                reason: error instanceof Error ? error.message : 'Unknown error',
                partial: true,
            });
        }
    }

    return { entries, errors, warnings };
}

// ─── File change detection ────────────────────────────────────────────────────

async function getCommitFileChanges(
    git: ReturnType<typeof simpleGit>,
    hash: string,
    testDir?: string,
): Promise<GitFileChange[]> {
    try {
        // Use diff-tree to get the file status for this commit
        const raw = await git.raw([
            'diff-tree',
            '--no-commit-id',
            '-r',
            '--name-status',
            '-M', // detect renames
            hash,
        ]);

        const changes: GitFileChange[] = [];

        for (const line of raw.trim().split('\n')) {
            if (!line) continue;
            const parts = line.split('\t');
            const status = parts[0];

            if (status.startsWith('R')) {
                // Rename: R<score>\t<old>\t<new>
                const oldPath = parts[1];
                const newPath = parts[2];
                // If testDir is specified, filter by directory; otherwise include all renames
                if (!testDir || isInTestDir(newPath, testDir) || isInTestDir(oldPath, testDir)) {
                    changes.push({ path: newPath, oldPath, status: 'renamed' });
                }
            } else {
                const filePath = parts[1];
                // If testDir is specified, filter by directory; otherwise include all files
                if (testDir && !isInTestDir(filePath, testDir)) continue;

                const mapped = mapGitStatus(status);
                if (mapped) changes.push({ path: filePath, status: mapped });
            }
        }

        return changes;
    } catch {
        return [];
    }
}

function isInTestDir(filePath: string, testDir: string): boolean {
    // Normalise to forward slashes and ensure testDir ends with / to avoid
    // prefix false positives (e.g. "test" matching "testing/foo.spec.ts")
    const normalised = testDir.endsWith('/') ? testDir : testDir + '/';
    return filePath.startsWith(normalised) || path.dirname(filePath) + '/' === normalised;
}

function mapGitStatus(status: string): GitFileChange['status'] | null {
    switch (status[0]) {
        case 'A':
            return 'added';
        case 'D':
            return 'deleted';
        case 'M':
            return 'modified';
        default:
            return null;
    }
}

// ─── Test-level change detection ──────────────────────────────────────────────

async function buildSpecChanges(
    git: ReturnType<typeof simpleGit>,
    hash: string,
    fileChanges: GitFileChange[],
    framework: Framework,
    projectPath: string,
    errors: HistoryError[],
    testDir?: string,
): Promise<SpecHistoryEntry[]> {
    const entries: SpecHistoryEntry[] = [];

    for (const change of fileChanges) {
        if (!isSpecFile(change.path)) continue;

        // Normalize cross-testDir renames: if a spec file moves INTO the tracked
        // test directory, treat it as a brand-new addition (all tests are added).
        // If it moves OUT of the test directory, treat it as a deletion.
        let effectiveChange = change;
        if (change.status === 'renamed' && change.oldPath && testDir) {
            const oldInTestDir = isInTestDir(change.oldPath, testDir);
            const newInTestDir = isInTestDir(change.path, testDir);
            if (!oldInTestDir && newInTestDir) {
                effectiveChange = { path: change.path, status: 'added' };
            } else if (oldInTestDir && !newInTestDir) {
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
            // Continue processing other files even if one fails
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
            changes: testChanges,
        };
    }

    // Modified file — diff test names between current and parent
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
        fileStatus: 'modified',
        changes: allChanges,
    };
}

// ─── Utilities ────────────────────────────────────────────────────────────────

async function getFileAtCommit(git: ReturnType<typeof simpleGit>, ref: string, filePath: string): Promise<string> {
    return git.show([`${ref}:${filePath}`]);
}

function isSpecFile(filePath: string): boolean {
    return /\.(spec|test)\.[jt]s$/.test(filePath);
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
