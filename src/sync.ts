import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { detectFrameworks } from './core';
import { parseAllSpecs } from './core';
import { buildHistory, getLatestCommitHash, getRepoUrl } from './git';
import { getSyncMarker, saveSyncMarker, syncToDashboard, fetchProjectConfig } from './sync-client';
import { DetectionResult, TestChange } from './types';

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

    console.log('[sync] Detecting frameworks...');
    const detected = detectFrameworks(process.cwd());

    // Build a mutable map of framework → DetectionResult for merging overrides
    const frameworkMap = new Map<string, DetectionResult>(detected.map((d) => [d.framework, d]));

    // Apply dashboard frameworkOverrides:
    // - If the framework was already detected, update its testDir
    // - If not detected, add it as a new entry (enables fully dashboard-driven configs)
    if (projectConfig?.frameworkOverrides?.length) {
        for (const override of projectConfig.frameworkOverrides) {
            if (!override.dirs?.length) continue;
            const existing = frameworkMap.get(override.framework);
            if (existing) {
                existing.testDir = override.dirs[0];
                console.log(`[config] ${override.framework}: testDir overridden to ${override.dirs[0]}`);
            } else {
                frameworkMap.set(override.framework, {
                    framework: override.framework,
                    testDir: override.dirs[0],
                    confidence: 'high',
                });
                console.log(`[config] ${override.framework}: added via dashboard override (dir: ${override.dirs[0]})`);
            }
        }
    }

    // Apply testDirExcludes: remove any framework config whose testDir starts with an excluded path
    if (projectConfig?.testDirExcludes?.length) {
        for (const excludeDir of projectConfig.testDirExcludes) {
            const normalised = excludeDir.replace(/^\.\//, '');
            for (const [fw, config] of frameworkMap) {
                const configDir = config.testDir.replace(/^\.\//, '');
                if (configDir.startsWith(normalised)) {
                    frameworkMap.delete(fw);
                    console.log(`[config] ${fw}: excluded by testDirExcludes (${excludeDir})`);
                }
            }
        }
    }

    let frameworkConfigs = [...frameworkMap.values()];

    // If nothing remains after exclusions, fall back to the primary framework or unknown
    if (frameworkConfigs.length === 0) {
        const primary = projectConfig?.primaryFramework;
        frameworkConfigs = [{ framework: primary ?? 'unknown', testDir: './tests', confidence: 'low' }];
        console.log(
            `[config] No frameworks remain after exclusions, falling back to: ${frameworkConfigs[0].framework}`,
        );
    }

    console.log(`[sync] Active frameworks (${frameworkConfigs.length}):`);
    for (const { framework, testDir, confidence } of frameworkConfigs) {
        console.log(`[sync]   ${framework} → ${testDir} (${confidence})`);
    }

    console.log('[sync] Parsing test specifications...');
    const specs = parseAllSpecs(process.cwd(), frameworkConfigs);
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
    const sinceDate = isFirstSync ? new Date(Date.now() - MAX_FIRST_SYNC_DAYS * 86_400_000) : undefined;
    if (sinceDate) {
        console.log(`[sync] First sync: limiting history to last ${MAX_FIRST_SYNC_DAYS} days`);
    }
    const history = await buildHistory(
        process.cwd(),
        frameworkConfigs,
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
            name: test.fullName,
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
        ...(repoUrl ? { repoUrl } : {}),
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
