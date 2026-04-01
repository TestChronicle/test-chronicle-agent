import { ProjectSyncRecord } from './types';
/**
 * Get the project sync baseline record from the dashboard.
 * Returns null if this is a new project (first sync).
 */
export declare function getProjectSyncRecord(dashboardUrl: string, apiToken: string, projectId: string): Promise<ProjectSyncRecord | null>;
/**
 * Save the project sync baseline record to the dashboard (on first sync).
 * Saves the baseline stats and framework for consistency checks on future syncs.
 */
export declare function saveProjectSyncRecord(dashboardUrl: string, apiToken: string, record: ProjectSyncRecord): Promise<void>;
/**
 * Update the last synced commit in the project sync record.
 * Called after each sync to track incremental progress.
 */
export declare function updateProjectLastSyncCommit(dashboardUrl: string, apiToken: string, projectId: string, commitHash: string): Promise<void>;
/**
 * Get the last synced commit hash from the dashboard.
 * Returns null if no sync has been performed yet.
 */
export declare function getSyncMarker(dashboardUrl: string, apiToken: string, projectId: string): Promise<string | null>;
/**
 * Save the last synced commit hash to the dashboard.
 */
export declare function saveSyncMarker(dashboardUrl: string, apiToken: string, projectId: string, commitHash: string): Promise<void>;
export declare function syncToDashboard(dashboardUrl: string, apiToken: string, payload: {
    projectId: string;
    specs: unknown[];
    history: unknown[];
    stats: unknown;
    timestamp: string;
}): Promise<{
    success: true;
    projectId: string;
    synced_at: string;
}>;
//# sourceMappingURL=sync-client.d.ts.map