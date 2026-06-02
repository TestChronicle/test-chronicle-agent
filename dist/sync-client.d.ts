import { DashboardSyncConfig } from './types';
/**
 * Validates that the API key and project ID are correct by hitting the config
 * endpoint early. Throws a descriptive error on auth failure or unknown project
 * so the sync fails fast before doing any expensive local work.
 */
export declare function validateProjectAccess(dashboardUrl: string, apiToken: string, projectId: string): Promise<void>;
/**
 * Fetch the project-level sync configuration from the dashboard.
 * Returns null on network error or non-OK response so the caller can
 * fall back to auto-detection gracefully.
 */
export declare function fetchProjectConfig(dashboardUrl: string, apiToken: string, projectId: string): Promise<DashboardSyncConfig | null>;
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
    repoUrl?: string;
    chunkIndex: number;
    isLastChunk: boolean;
}): Promise<{
    success: true;
    projectId: string;
    synced_at: string;
}>;
//# sourceMappingURL=sync-client.d.ts.map