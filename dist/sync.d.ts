export interface SyncOptions {
    projectId: string;
    apiKey: string;
    dashboardUrl: string;
}
/**
 * Core sync function - syncs test data to dashboard
 * Implements the baseline sync model:
 * - First sync: Creates baseline stats and saves ProjectSyncRecord
 * - Subsequent syncs: Uses lastSyncCommit from ProjectSyncRecord for incremental updates
 */
export declare function syncProject(options: SyncOptions): Promise<void>;
//# sourceMappingURL=sync.d.ts.map