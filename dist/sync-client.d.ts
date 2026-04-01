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