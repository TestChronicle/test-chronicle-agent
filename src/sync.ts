import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { detectFrameworks } from './core';
import { parseAllSpecs } from './core';
import { buildHistory, getLatestCommitHash, getRepoUrl, getDefaultBranch, getRemoteBranchTip } from './git';
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

// Configuration for sync operation
export interface SyncOptions {
    projectId: string;
    apiKey: string;
    dashboardUrl: string;
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
    for (const override of overrides) {
        if (!override.dirs?.length) continue;

        // Remove all auto-detected entries for this framework so the explicit dirs take over
        for (const [key, config] of frameworkMap) {
            if (config.framework === override.framework) frameworkMap.delete(key);
        }

        for (const dir of override.dirs) {
            frameworkMap.set(mapKey(override.framework, dir), {
                framework: override.framework,
                testDir: dir,
                confidence: 'high',
            });
            console.log(`[config] ${override.framework}: dir added via dashboard override -> ${dir}`);
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
                console.log(`[config] ${config.framework}: excluded by testDirExcludes (${excludeDir})`);
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
    console.log('[sync] Validating project access...');
    await validateProjectAccess(dashboardUrl, apiKey, projectId);

    // Load .env.local from project directory if it exists
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
        dotenv.config({ path: envLocalPath, debug: false });
    }

    // Resolve repo URL: explicit option takes priority, then auto-detect from git remote
    const detectedRepoUrl = await getRepoUrl(process.cwd());
    if (detectedRepoUrl) {
        console.log(`[sync] Detected repository URL: ${detectedRepoUrl}`);
    }
    const repoUrl = detectedRepoUrl ?? undefined;

    console.log('[config] Fetching project config from dashboard...');
    let projectConfig = await fetchProjectConfig(dashboardUrl, apiKey, projectId);
    const overrideCount = projectConfig?.frameworkOverrides?.length ?? 0;
    if (projectConfig === null) {
        console.log('[config] Warning: Could not reach dashboard config endpoint. Using auto-detected config');
    } else if (overrideCount > 0) {
        console.log(`[config] Loaded project config from dashboard (${overrideCount} framework override(s))`);
    } else {
        console.log('[config] No project overrides set. Using auto-detected config');
    }

    // Resolve the default branch: dashboard setting takes priority, then auto-detect from git
    const defaultBranch = projectConfig?.defaultBranch ?? (await getDefaultBranch(process.cwd()));
    console.log(`[sync] Default branch: ${defaultBranch}`);

    console.log('[sync] Detecting frameworks...');
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
            `[config] No frameworks remain after exclusions, falling back to: ${frameworkConfigs[0].framework}`,
        );
    }

    for (const { framework, testDir, confidence } of frameworkConfigs) {
        console.log(`[sync]   ${framework} → ${testDir} (${confidence})`);
    }

    console.log('[sync] Parsing test specifications...');
    const specs = parseAllSpecs(process.cwd(), frameworkConfigs);
    const totalTests = specs.reduce((sum, spec) => sum + spec.testCount, 0);
    console.log(`[sync] Found ${specs.length} spec files with ${totalTests} tests`);

    // Check if this is first sync or subsequent sync
    let lastSyncCommit: string | null = null;
    let isFirstSync = false;

    try {
        lastSyncCommit = await getSyncMarker(dashboardUrl, apiKey, projectId);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`[sync] Warning: Could not retrieve sync marker: ${error.message}`);
        }
    }

    isFirstSync = !lastSyncCommit;
    if (isFirstSync) {
        console.log('[sync] First sync detected - creating baseline');
    } else {
        console.log(`[sync] Subsequent sync - last synced: ${lastSyncCommit!.substring(0, 7)}`);
    }

    console.log('[sync] Building git history...');

    // For first sync, scan all commits; for subsequent, only scan incremental
    const sinceCommit = isFirstSync ? undefined : lastSyncCommit!;
    const sinceDate = isFirstSync ? new Date(Date.now() - MAX_FIRST_SYNC_DAYS * 86_400_000) : undefined;
    if (sinceDate) {
        console.log(`[sync] First sync: limiting history to last ${MAX_FIRST_SYNC_DAYS} days`);
    }
    const history = await buildHistory(
        process.cwd(),
        frameworkConfigs,
        defaultBranch,
        sinceCommit,
        false, // never do full history anymore
        sinceDate,
    );
    console.log(`[sync] Built history for ${history.entries.length} commits`);

    // Report any errors encountered during history building
    if (history.errors.length > 0) {
        console.warn(`[sync] Warning: ${history.errors.length} commits had processing issues:`);
        history.errors.slice(0, 5).forEach((error) => {
            console.warn(`[sync]   - ${error.commit.substring(0, 7)}: ${error.file} (${error.reason})`);
        });
        if (history.errors.length > 5) {
            console.warn(`[sync]   ... and ${history.errors.length - 5} more`);
        }
    }
    if (history.warnings.length > 0) {
        history.warnings.forEach((warning) => {
            console.warn(`[sync] Warning: ${warning}`);
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

    console.log('[sync] Syncing to dashboard...');

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

    if (totalChunks > 1) {
        console.log(`[sync] Uploading in ${totalChunks} batches...`);
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
            ...(repoUrl ? { repoUrl } : {}),
            chunkIndex,
            isLastChunk,
        });

        if (totalChunks > 1) {
            console.log(`[sync]   → ${chunkIndex + 1}/${totalChunks} batches uploaded`);
        }

        if (isLastChunk) {
            console.log(
                `[sync] Done — ${specs.length} specs, ${totalTests} tests, ${history.entries.length} commits synced`,
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
            console.log('[sync] Warning: Could not determine last commit hash');
            return;
        }

        await saveSyncMarker(dashboardUrl, apiKey, projectId, lastHash);

        if (isFirstSync) {
            console.log(`[sync] Created baseline: ${specs.length} files, ${totalTests} tests`);
        } else {
            console.log(`[sync] Updated sync marker: ${lastHash.substring(0, 7)}`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`[sync] Warning: Could not save sync marker: ${error.message}`);
        }
    }
}
