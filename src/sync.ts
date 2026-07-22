import packageJson from '../package.json';
import { detectFrameworks } from './core';
import { parseAllSpecs } from './core';
import {
    buildHistory,
    getLatestCommitHash,
    getRepoUrl,
    getDefaultBranch,
    getRemoteBranchTip,
    getCurrentBranch,
    isCommitReachableFromBranch,
} from './git';
import {
    getSyncMarker,
    saveSyncMarker,
    syncToDashboard,
    fetchProjectConfig,
    validateProjectAccess,
} from './sync-client';
import { DetectionResult, TestChange, FrameworkOverride, CommitHistory, SpecFile } from './types';

/** Maximum number of days of history to fetch on a first sync. */
const MAX_FIRST_SYNC_DAYS = 365;

/** Dashboard sync payload contract version. */
const PAYLOAD_SCHEMA_VERSION = '2026-07';

// Configuration for sync operation
export interface SyncOptions {
    projectId: string;
    apiKey: string;
    dashboardUrl: string;
}

type SyncSource = 'local_cli' | 'github_actions';

function getSyncSource(env: NodeJS.ProcessEnv = process.env): SyncSource {
    return env.GITHUB_ACTIONS === 'true' ? 'github_actions' : 'local_cli';
}

async function resolveLatestCommitHash(
    projectPath: string,
    branch: string,
    transformedHistory: Array<{ commitHash: string }>,
): Promise<string> {
    const branchTip = await getRemoteBranchTip(projectPath, branch);
    if (branchTip) return branchTip;

    if (transformedHistory.length > 0) {
        return transformedHistory[transformedHistory.length - 1].commitHash;
    }

    const localHead = await getLatestCommitHash(projectPath);
    if (localHead) return localHead;

    throw new Error('Could not determine latest commit hash for sync payload.');
}

async function resolveCurrentBranch(projectPath: string, defaultBranch: string, source: SyncSource): Promise<string> {
    const githubRefName = source === 'github_actions' ? process.env.GITHUB_REF_NAME?.trim() : undefined;
    if (githubRefName) return githubRefName;

    return (await getCurrentBranch(projectPath)) ?? defaultBranch;
}

/**
 * Creates a consistent composite key for test changes.
 * Used for deduplication at both spec and commit levels.
 */
function getChangeKey(change: TestChange, specPath?: string): string {
    const path = specPath ?? '';
    const oldName = change.oldName ?? '';
    return `${path}:${change.type}:${change.name}:${oldName}`;
}

/** Composite map key so multiple entries per framework (e.g. ios + android) can coexist. */
function mapKey(framework: string, testDir: string): string {
    return `${framework}:${testDir}`;
}

/**
 * Merges dashboard frameworkOverrides into the framework map.
 * Each dir in override.dirs adds/replaces one entry. Auto-detected entries for the
 * same framework that are not mentioned in dirs are removed, so the dashboard config
 * is authoritative when overrides are present.
 */
function applyFrameworkOverrides(frameworkMap: Map<string, DetectionResult>, overrides: FrameworkOverride[]): void {
    // Track which frameworks have already had their auto-dtected entries removed.
    // Without this, a second override for the same framework would delete entries
    // added by the first override, leaving only the last one in the map.
    const cleaned = new Set<string>();

    for (const override of overrides) {
        if (!override.dirs?.length) continue;

        // Remove all auto-detected entries for this framework so the explicit dirs take over,
        // but only do this once per framework so previous overrides' entries are preserved.
        if (!cleaned.has(override.framework)) {
            for (const [key, config] of frameworkMap) {
                if (config.framework === override.framework) {
                    frameworkMap.delete(key);
                }
            }
                cleaned.add(override.framework);
        }

        for (const dir of override.dirs) {
            frameworkMap.set(mapKey(override.framework, dir), {
                framework: override.framework,
                testDir: dir,
                confidence: 'high',
            });
            console.log(`[config] ${override.framework}: dashboard override added ${dir}.`);
        }
    }
}

/**
 * Removes framework entries whose testDir starts with an excluded path.
 */
function applyTestDirExcludes(frameworkMap: Map<string, DetectionResult>, excludes: string[]): void {
    for (const excludeDir of excludes) {
        const normalised = excludeDir.replace(/^\.\//, '');
        for (const [key, config] of frameworkMap) {
            const configDir = config.testDir.replace(/^\.\//, '');
            if (configDir.startsWith(normalised)) {
                frameworkMap.delete(key);
                console.log(`[config] ${config.framework}: excluded ${excludeDir}.`);
            }
        }
    }
}

/**
 * Transforms parsed spec files into the shape expected by the dashboard API.
 */
function transformSpecsForPayload(specs: SpecFile[]) {
    return specs.map((spec) => ({
        filePath: spec.path,
        framework: spec.framework,
        tests: spec.tests.map((test) => ({
            name: test.fullName,
            lineNumber: test.line,
            tags: test.tags.map((tag) => tag.name),
        })),
    }));
}

type CommitChange = {
    specPath: string;
    testName: string;
    type: 'added' | 'deleted' | 'renamed' | 'maintenance';
    oldName?: string;
    framework: string;
};

/**
 * Deduplicates all test changes for a single commit entry.
 * Removes exact duplicates and suppresses cross-spec move double-counting.
 */
function deduplicateCommitChanges(entry: CommitHistory): CommitChange[] {
    // Collect all changes from all specs in this commit
    const allChanges: CommitChange[] = [];
    for (const spec of entry.specs) {
        for (const change of spec.changes) {
            allChanges.push({
                specPath: spec.specPath,
                testName: change.name,
                type: change.type,
                oldName: change.oldName,
                framework: spec.framework,
            });
        }
    }

    // Remove exact duplicates using the same composite key
    const seenKeys = new Set<string>();
    const uniqueChanges = allChanges.filter((change) => {
        const key = getChangeKey(
            { type: change.type, name: change.testName, oldName: change.oldName },
            change.specPath,
        );
        if (seenKeys.has(key)) return false;
        seenKeys.add(key);
        return true;
    });

    // Detect cross-spec moves: if the same test name is both removed from one spec
    // and added to a different spec in the same commit, it's a move — suppress the
    // remove entry so the test isn't double-counted as remove + add.
    const removedByName = new Map<string, number[]>();
    uniqueChanges.forEach((c, i) => {
        if (c.type === 'deleted') {
            const existing = removedByName.get(c.testName) ?? [];
            existing.push(i);
            removedByName.set(c.testName, existing);
        }
    });
    const suppressedRemoves = new Set<number>();
    uniqueChanges.forEach((c) => {
        if (c.type === 'added') {
            const removeIndices = removedByName.get(c.testName);
            if (removeIndices) {
                const crossSpecIdx = removeIndices.find(
                    (i) => !suppressedRemoves.has(i) && uniqueChanges[i].specPath !== c.specPath,
                );
                if (crossSpecIdx !== undefined) suppressedRemoves.add(crossSpecIdx);
            }
        }
    });

    return uniqueChanges.filter((_, i) => !suppressedRemoves.has(i));
}

/**
 * Core sync function - syncs test data to dashboard.
 * First sync creates a baseline marker; subsequent syncs are incremental from the last commit.
 */
export async function syncProject(options: SyncOptions): Promise<void> {
    const { projectId, apiKey, dashboardUrl } = options;

    // Validate API key and project ID early — fail fast before any expensive work
    console.log('[sync] Validating project access.');
    await validateProjectAccess(dashboardUrl, apiKey, projectId);

    // Resolve repo URL: explicit option takes priority, then auto-detect from git remote
    const detectedRepoUrl = await getRepoUrl(process.cwd());
    if (detectedRepoUrl) {
        console.log(`[sync] Repository: ${detectedRepoUrl}`);
    }
    const repoUrl = detectedRepoUrl ?? undefined;

    console.log('[config] Fetching project config.');
    let projectConfig = await fetchProjectConfig(dashboardUrl, apiKey, projectId);
    const overrideCount = projectConfig?.frameworkOverrides?.length ?? 0;
    if (projectConfig === null) {
        console.warn('[config] Could not fetch project config; using auto-detected settings.');
    } else if (overrideCount > 0) {
        console.log(`[config] Loaded project config (${overrideCount} framework override(s)).`);
    } else {
        console.log('[config] No project overrides set; using auto-detected settings.');
    }

    // Resolve the default branch: dashboard setting takes priority, then auto-detect from git
    const defaultBranch = projectConfig?.defaultBranch ?? (await getDefaultBranch(process.cwd()));
    console.log(`[sync] Default branch: ${defaultBranch}`);
    const source = getSyncSource();
    const currentBranch = await resolveCurrentBranch(process.cwd(), defaultBranch, source);
    console.log(`[sync] Current branch: ${currentBranch}`);

    console.log('[sync] Detecting frameworks.');
    const detected = detectFrameworks(process.cwd());

    // Build a mutable map keyed by "framework:testDir" so multiple entries for the
    // same framework (e.g. cucumber ios + android) can coexist.
    const frameworkMap = new Map<string, DetectionResult>(detected.map((d) => [mapKey(d.framework, d.testDir), d]));

    // Apply dashboard frameworkOverrides and testDirExcludes from project config
    applyFrameworkOverrides(frameworkMap, projectConfig?.frameworkOverrides ?? []);
    applyTestDirExcludes(frameworkMap, projectConfig?.testDirExcludes ?? []);

    let frameworkConfigs = [...frameworkMap.values()];

    // If nothing remains after exclusions, fall back to the primary framework or unknown
    if (frameworkConfigs.length === 0) {
        const primary = projectConfig?.primaryFramework;
        frameworkConfigs = [{ framework: primary ?? 'unknown', testDir: './tests', confidence: 'low' }];
        console.log(
            `[config] No frameworks matched after exclusions; using ${frameworkConfigs[0].framework}.`,
        );
    }

    for (const { framework, testDir, confidence } of frameworkConfigs) {
        console.log(`[sync]   ${framework}: ${testDir} (${confidence})`);
    }

    console.log('[sync] Parsing test specifications.');
    const specs = parseAllSpecs(process.cwd(), frameworkConfigs);
    const totalTests = specs.reduce((sum, spec) => sum + spec.testCount, 0);
    console.log(`[sync] Found ${specs.length} spec files and ${totalTests} tests.`);

    // Check if this is first sync or subsequent sync
    let lastSyncCommit: string | null = null;
    let isFirstSync = false;
    let isRecoveringFromInvalidMarker = false;
    const preflightWarnings: string[] = [];

    try {
        lastSyncCommit = await getSyncMarker(dashboardUrl, apiKey, projectId);
    } catch (error) {
        if (error instanceof Error) {
            console.warn(`[sync] Could not retrieve sync marker: ${error.message}`);
        }
    }

    if (lastSyncCommit) {
        const markerIsReachable = await isCommitReachableFromBranch(process.cwd(), lastSyncCommit, defaultBranch);
        if (!markerIsReachable) {
            const warning = `Stored sync marker ${lastSyncCommit.substring(
                0,
                7,
            )} is not reachable from origin/${defaultBranch}; running a bounded resync.`;
            console.warn(`[sync] ${warning}`);
            preflightWarnings.push(warning);
            lastSyncCommit = null;
            isRecoveringFromInvalidMarker = true;
        }
    }

    isFirstSync = !lastSyncCommit;
    if (isRecoveringFromInvalidMarker) {
        console.log('[sync] Rebuilding bounded history from the repository default branch.');
    } else if (isFirstSync) {
        console.log('[sync] First sync: creating baseline.');
    } else {
        console.log(`[sync] Incremental sync from ${lastSyncCommit!.substring(0, 7)}.`);
    }

    console.log('[sync] Building git history.');

    // For first sync, scan all commits; for subsequent, only scan incremental
    const sinceCommit = isFirstSync ? undefined : lastSyncCommit!;
    const sinceDate = isFirstSync ? new Date(Date.now() - MAX_FIRST_SYNC_DAYS * 86_400_000) : undefined;
    if (sinceDate) {
        const mode = isRecoveringFromInvalidMarker ? 'Bounded resync' : 'First sync';
        console.log(`[sync] ${mode}: scanning the last ${MAX_FIRST_SYNC_DAYS} days.`);
    }
    const history = await buildHistory(
        process.cwd(),
        frameworkConfigs,
        defaultBranch,
        sinceCommit,
        false, // never do full history anymore
        sinceDate,
    );
    console.log(`[sync] Built history for ${history.entries.length} commits.`);

    // Report any errors encountered during history building
    if (history.errors.length > 0) {
        console.warn(`[sync] ${history.errors.length} commits had processing issues:`);
        history.errors.slice(0, 5).forEach((error) => {
            console.warn(`[sync]   - ${error.commit.substring(0, 7)}: ${error.file} (${error.reason})`);
        });
        if (history.errors.length > 5) {
            console.warn(`[sync]   and ${history.errors.length - 5} more.`);
        }
    }
    if (history.warnings.length > 0) {
        history.warnings.forEach((warning) => {
            console.warn(`[sync] ${warning}`);
        });
    }

    // Compute stats
    const tags: Record<string, number> = {};
    let parameterizedTestCount = 0;
    specs.forEach((spec) => {
        spec.tests.forEach((test) => {
            test.tags?.forEach((tag) => {
                tags[tag.name] = (tags[tag.name] || 0) + 1;
                if (tag.name === '@parameterized') {
                    parameterizedTestCount++;
                }
            });
        });
    });

    const stats = {
        totalSpecs: specs.length,
        totalTests,
        tags,
        parameterizedTestCount,
    };

    console.log('[sync] Syncing to dashboard.');

    const transformedSpecs = transformSpecsForPayload(specs);

    const transformedHistory = history.entries.map((entry) => {
        const deduplicatedChanges = deduplicateCommitChanges(entry);
        return {
            commitHash: entry.commit.hash,
            commitMessage: entry.commit.message,
            author: entry.commit.author,
            commitDate: entry.commit.date,
            changes: deduplicatedChanges.map((change) => ({
                specFile: change.specPath,
                testName: change.testName,
                type: change.type,
                framework: change.framework,
                details: change.oldName ? { old_name: change.oldName } : undefined,
            })),
        };
    });

    // Upload history in chunks (oldest-first) so that:
    //  - Each request stays small and completes well within the 60 s timeout
    //  - An intermediate sync marker is saved after each successful chunk so
    //    a re-run after interruption only re-uploads the remaining chunks
    const HISTORY_CHUNK_SIZE = 100;
    // Reverse so index 0 = oldest commit; git log returns newest-first.
    const historyOldestFirst = [...transformedHistory].reverse();
    const totalChunks = Math.max(1, Math.ceil(historyOldestFirst.length / HISTORY_CHUNK_SIZE));
    const timestamp = new Date().toISOString();

    const latestCommitHash = await resolveLatestCommitHash(process.cwd(), defaultBranch, transformedHistory);
    const commitRangeStart = transformedHistory.length > 0 ? transformedHistory[0].commitHash : latestCommitHash;
    const commitRangeEnd =
        transformedHistory.length > 0 ? transformedHistory[transformedHistory.length - 1].commitHash : latestCommitHash;
    const syncId = `sync:${projectId}:${timestamp}`;
    const warnings = [...preflightWarnings, ...history.warnings];

    if (totalChunks > 1) {
        console.log(`[sync] Uploading ${totalChunks} batches.`);
    }

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const isLastChunk = chunkIndex === totalChunks - 1;
        const chunkStart = chunkIndex * HISTORY_CHUNK_SIZE;
        const historyChunk = historyOldestFirst.slice(chunkStart, chunkStart + HISTORY_CHUNK_SIZE);

        await syncToDashboard(dashboardUrl, apiKey, {
            projectId,
            // Only include specs and stats with the first chunk — the server uses
            // the spec list to upsert files and prune stale entries.
            specs: chunkIndex === 0 ? transformedSpecs : [],
            history: historyChunk,
            stats: chunkIndex === 0 ? stats : {},
            timestamp,
            syncId,
            source,
            agentVersion: packageJson.version,
            payloadSchemaVersion: PAYLOAD_SCHEMA_VERSION,
            branch: currentBranch,
            repositoryDefaultBranch: defaultBranch,
            latestCommitHash,
            commitRangeStart,
            commitRangeEnd,
            ...(repoUrl ? { repoUrl } : {}),
            chunkIndex,
            isLastChunk,
            expectedChunkCount: totalChunks,
            warnings,
        });

        if (totalChunks > 1) {
            console.log(`[sync]   ${chunkIndex + 1}/${totalChunks} batches uploaded.`);
        }

        if (isLastChunk) {
            console.log(
                `[sync] Done: ${specs.length} specs, ${totalTests} tests, ${history.entries.length} commits synced.`,
            );
            console.log(`[sync] Dashboard: ${new URL(`/dashboard/${projectId}`, dashboardUrl).toString()}`);
        } else {
            // Save the hash of the newest commit in this chunk as an intermediate
            // marker. buildHistory(since=thatHash) on the next run will return
            // exactly the commits that haven't been uploaded yet.
            const newestInChunk = historyChunk[historyChunk.length - 1].commitHash;
            try {
                await saveSyncMarker(dashboardUrl, apiKey, projectId, newestInChunk);
            } catch {
                // Non-fatal — worst case the next run re-uploads from the previous marker
            }
        }
    }

    // Handle baseline sync and incremental marker
    // Always save the tip of origin/<defaultBranch> as the marker so that
    // unmerged feature-branch commits can never pollute future incremental syncs.
    try {
        let lastHash: string | null = await getRemoteBranchTip(process.cwd(), defaultBranch);

        if (!lastHash) {
            // Fallback: use the last processed commit or local HEAD
            lastHash =
                history.entries.length > 0
                    ? history.entries[history.entries.length - 1].commit.hash
                    : await getLatestCommitHash(process.cwd());
        }

        if (!lastHash) {
            console.warn('[sync] Could not determine the last commit hash.');
            return;
        }

        await saveSyncMarker(dashboardUrl, apiKey, projectId, lastHash);

        if (isRecoveringFromInvalidMarker) {
            console.log(`[sync] Rebuilt sync marker: ${lastHash.substring(0, 7)}.`);
        } else if (isFirstSync) {
            console.log(`[sync] Created baseline: ${specs.length} files, ${totalTests} tests.`);
        } else {
            console.log(`[sync] Updated sync marker: ${lastHash.substring(0, 7)}.`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.warn(`[sync] Could not save sync marker: ${error.message}`);
        }
    }
}
