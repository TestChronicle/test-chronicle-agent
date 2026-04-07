import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { detectFramework } from './core';
import { parseAllSpecs } from './core';
import { buildHistory, getLatestCommitHash } from './git';
import { getSyncMarker, saveSyncMarker, syncToDashboard } from './sync-client';
import { TestChange } from './types';

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
 * Core sync function - syncs test data to dashboard.
 * First sync creates a baseline marker; subsequent syncs are incremental from the last commit.
 */
export async function syncProject(options: SyncOptions): Promise<void> {
    const { projectId, apiKey, dashboardUrl } = options;

    // Load .env.local from project directory if it exists
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
        dotenv.config({ path: envLocalPath, debug: false });
    }

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
            type: 'added' | 'deleted' | 'renamed' | 'maintenance';
            oldName?: string;
        }> = [];

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
                    if (crossSpecIdx !== undefined) {
                        suppressedRemoves.add(crossSpecIdx);
                    }
                }
            }
        });
        const deduplicatedChanges = uniqueChanges.filter((_, i) => !suppressedRemoves.has(i));

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

    // Handle baseline sync and incremental marker
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
