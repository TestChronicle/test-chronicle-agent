import { detectFramework } from './core';
import { parseAllSpecs } from './core';
import { buildHistory, getLatestCommitHash } from './git';
import {
    getProjectSyncRecord,
    saveProjectSyncRecord,
    updateProjectLastSyncCommit,
    syncToDashboard,
} from './sync-client';
import { TestChange, ProjectSyncRecord } from './types';

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

/**
 * Deduplicates test changes using a consistent composite key.
 * Removes duplicate entries that have the same (specPath, type, name, oldName) combination.
 */
function deduplicateChanges(changes: TestChange[], specPath?: string): TestChange[] {
    const seen = new Set<string>();
    const deduplicated: TestChange[] = [];

    for (const change of changes) {
        const key = getChangeKey(change, specPath);

        if (!seen.has(key)) {
            seen.add(key);
            deduplicated.push(change);
        }
    }

    return deduplicated;
}

/**
 * Core sync function - syncs test data to dashboard
 * Implements the baseline sync model:
 * - First sync: Creates baseline stats and saves ProjectSyncRecord
 * - Subsequent syncs: Uses lastSyncCommit from ProjectSyncRecord for incremental updates
 */
export async function syncProject(options: SyncOptions): Promise<void> {
    const { projectId, apiKey, dashboardUrl } = options;

    console.log('[sync] Detecting framework...');
    const detection = detectFramework(process.cwd());
    console.log(`[sync] Detected framework: ${detection.framework}`);
    console.log(`[sync] Test directory: ${detection.testDir}`);

    console.log('[sync] Parsing test specifications...');
    const specs = parseAllSpecs(process.cwd(), detection.testDir, detection.framework);
    console.log(`[sync] Found ${specs.length} spec files`);

    const totalTests = specs.reduce((sum, spec) => sum + spec.testCount, 0);
    console.log(`[sync] Total tests: ${totalTests}`);

    // Check if this is first sync or subsequent sync
    console.log('[sync] Checking sync status...');
    let syncRecord: ProjectSyncRecord | null = null;
    let isFirstSync = false;

    try {
        syncRecord = await getProjectSyncRecord(dashboardUrl, apiKey, projectId);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`[sync] Warning: Could not retrieve sync record: ${error.message}`);
        }
    }

    isFirstSync = !syncRecord;
    if (isFirstSync) {
        console.log('[sync] First sync detected - creating baseline');
    } else {
        console.log(`[sync] Subsequent sync - last synced: ${syncRecord!.lastSyncCommit.substring(0, 7)}`);
    }

    console.log('[sync] Building git history...');

    // For first sync, scan all commits; for subsequent, only scan incremental
    const sinceCommit = isFirstSync ? undefined : syncRecord!.lastSyncCommit;
    const history = await buildHistory(
        process.cwd(),
        detection.testDir,
        detection.framework,
        sinceCommit,
        false, // never do full history anymore
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
    specs.forEach((spec) => {
        spec.tests.forEach((test) => {
            test.tags?.forEach((tag) => {
                tags[tag.name] = (tags[tag.name] || 0) + 1;
            });
        });
    });

    const stats = {
        totalSpecs: specs.length,
        totalTests,
        tags,
    };

    console.log('[sync] Summary');
    console.log(`[sync] Specs: ${specs.length}`);
    console.log(`[sync] Tests: ${totalTests}`);

    console.log('[sync] Syncing to dashboard...');

    // Transform specs to match dashboard schema
    const transformedSpecs = specs.map((spec) => ({
        filePath: spec.path,
        framework: spec.framework,
        tests: spec.tests.map((test) => ({
            name: test.name,
            lineNumber: test.line,
            tags: test.tags.map((tag) => tag.name),
        })),
    }));

    // Transform history to match dashboard schema
    // Apply strong deduplication at commit level
    const transformedHistory = history.entries.map((entry) => {
        // Collect all changes from all specs, then deduplicate across the entire commit
        const allChanges: Array<{
            specPath: string;
            testName: string;
            type: 'added' | 'removed' | 'modified';
            oldName?: string;
        }> = [];

        for (const spec of entry.specs) {
            // Deduplicate changes for this spec using consistent key function
            const deduplicatedChanges = deduplicateChanges(spec.changes, spec.specPath);

            for (const change of deduplicatedChanges) {
                allChanges.push({
                    specPath: spec.specPath,
                    testName: change.name,
                    type: change.type,
                    oldName: change.oldName,
                });
            }
        }

        // Deduplicate across entire commit using same consistent key
        const seenKeys = new Set<string>();
        const uniqueChanges = allChanges.filter((change) => {
            const key = getChangeKey(
                {
                    type: change.type,
                    name: change.testName,
                    oldName: change.oldName,
                },
                change.specPath,
            );
            if (seenKeys.has(key)) return false;
            seenKeys.add(key);
            return true;
        });

        return {
            commitHash: entry.commit.hash,
            commitMessage: entry.commit.message,
            author: entry.commit.author,
            commitDate: entry.commit.date,
            changes: uniqueChanges.map((change) => ({
                specFile: change.specPath,
                testName: change.testName,
                type: change.type === 'removed' ? 'deleted' : change.type,
                details: change.oldName ? { old_name: change.oldName } : undefined,
            })),
        };
    });

    const payload = {
        projectId,
        specs: transformedSpecs,
        history: transformedHistory,
        stats,
        timestamp: new Date().toISOString(),
    };

    await syncToDashboard(dashboardUrl, apiKey, payload);
    console.log('[sync] Sync successful!');
    console.log(`[sync] Synced ${specs.length} specs with ${totalTests} tests`);

    // Handle baseline sync record and incremental marker
    try {
        let lastHash: string | null = null;

        if (history.entries.length > 0) {
            lastHash = history.entries[history.entries.length - 1].commit.hash;
        } else {
            lastHash = await getLatestCommitHash(process.cwd());
        }

        if (!lastHash) {
            console.log('[sync] Warning: Could not determine last commit hash');
            return;
        }

        if (isFirstSync) {
            // Create and save baseline sync record for first sync
            const currentCommit = await getLatestCommitHash(process.cwd());
            if (!currentCommit) {
                throw new Error('Could not determine current commit for baseline');
            }

            const newRecord: ProjectSyncRecord = {
                projectId,
                firstSyncDate: new Date().toISOString(),
                firstSyncCommit: currentCommit,
                baselineStats: {
                    totalTests,
                    totalFiles: specs.length,
                    tags,
                },
                lastSyncCommit: lastHash,
                detectedFramework: detection.framework,
            };

            await saveProjectSyncRecord(dashboardUrl, apiKey, newRecord);
            console.log(`[sync] Created baseline: ${specs.length} files, ${totalTests} tests`);
        } else {
            // Update last sync commit for incremental syncs
            await updateProjectLastSyncCommit(dashboardUrl, apiKey, projectId, lastHash);
            console.log(`[sync] Updated sync marker: ${lastHash.substring(0, 7)}`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`[sync] Warning: Could not save sync record: ${error.message}`);
        }
    }
}
