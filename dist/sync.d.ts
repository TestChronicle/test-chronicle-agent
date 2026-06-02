export interface SyncOptions {
    projectId: string;
    apiKey: string;
    dashboardUrl: string;
}
/**
 * Core sync function - syncs test data to dashboard.
 * First sync creates a baseline marker; subsequent syncs are incremental from the last commit.
 */
export declare function syncProject(options: SyncOptions): Promise<void>;
//# sourceMappingURL=sync.d.ts.map