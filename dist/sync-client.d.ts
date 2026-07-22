import { DashboardSyncConfig } from './types';
/**
 * Validates dashboard authentication by hitting the lightweight config endpoint
 * early. A 404 from this endpoint is not treated as fatal because older
 * dashboard deployments and projects without config may not expose config data.
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
    syncId: string;
    source: 'local_cli' | 'github_actions';
    agentVersion: string;
    payloadSchemaVersion: string;
    branch: string;
    repositoryDefaultBranch: string;
    latestCommitHash: string;
    commitRangeStart: string;
    commitRangeEnd: string;
    repoUrl?: string;
    chunkIndex: number;
    isLastChunk: boolean;
    expectedChunkCount: number;
    warnings?: string[];
}): Promise<{
    success: true;
    projectId: string;
    synced_at: string;
}>;
//# sourceMappingURL=sync-client.d.ts.map