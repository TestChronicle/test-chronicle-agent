// Sync client for posting data to dashboard

import { DashboardSyncConfig } from './types';

interface SyncMarkerResponse {
    lastSyncedCommit?: string;
    commitHash?: string;
}

function isProjectAccessError(errorBody: string): boolean {
    return /project not found|not in the key/i.test(errorBody);
}

function projectAccessError(projectId: string): Error {
    return new Error(
        `Project not found or not available to this API key: ${projectId}. Check that API_KEY belongs to the same team as PROJECT_ID.`,
    );
}

function makeAuthHeaders(apiToken: string): Record<string, string> {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
    };
}

/**
 * Validates dashboard authentication by hitting the lightweight config endpoint
 * early. A 404 from this endpoint is not treated as fatal because older
 * dashboard deployments and projects without config may not expose config data.
 */
export async function validateProjectAccess(dashboardUrl: string, apiToken: string, projectId: string): Promise<void> {
    const url = new URL(`/api/projects/${projectId}/config`, dashboardUrl).toString();
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: makeAuthHeaders(apiToken),
        });
        if (response.status === 401 || response.status === 403) {
            throw new Error('Invalid API key. Please check your API_KEY.');
        }
        if (response.status === 404) {
            const errorBody = await response.text().catch(() => '');
            if (isProjectAccessError(errorBody)) {
                throw projectAccessError(projectId);
            }
            console.warn('[sync] Could not fetch project config (404); using auto-detected settings.');
            return;
        }
        if (!response.ok) {
            console.warn(`[sync] Could not validate project access (${response.status}); continuing.`);
        }
    } catch (error) {
        if (
            error instanceof Error &&
            (error.message.startsWith('Invalid API key') || error.message.startsWith('Project not found'))
        ) {
            throw error;
        }
        // Network / unreachable — warn and let the sync attempt proceed
        console.warn('[sync] Could not reach dashboard to validate project access; continuing.');
    }
}

/**
 * Fetch the project-level sync configuration from the dashboard.
 * Returns null on network error or non-OK response so the caller can
 * fall back to auto-detection gracefully.
 */
export async function fetchProjectConfig(
    dashboardUrl: string,
    apiToken: string,
    projectId: string,
): Promise<DashboardSyncConfig | null> {
    const url = new URL(`/api/projects/${projectId}/config`, dashboardUrl).toString();
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: makeAuthHeaders(apiToken),
        });
        if (!response.ok) return null;
        return (await response.json()) as DashboardSyncConfig;
    } catch {
        return null;
    }
}

/**
 * Get the last synced commit hash from the dashboard.
 * Returns null if no sync has been performed yet.
 */
export async function getSyncMarker(dashboardUrl: string, apiToken: string, projectId: string): Promise<string | null> {
    const url = new URL(`/api/projects/${projectId}/sync-marker`, dashboardUrl).toString();

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: makeAuthHeaders(apiToken),
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error('Invalid API key. Please check your API_KEY.');
            }
            const errorBody = await response.text().catch(() => '');
            // 404 is expected on first sync when no marker has been created yet.
            if (response.status === 404 && !isProjectAccessError(errorBody)) return null;
            if (isProjectAccessError(errorBody)) {
                throw projectAccessError(projectId);
            }
            throw new Error(`Failed with status ${response.status}${errorBody ? ` - ${errorBody}` : ''}`);
        }

        const data = (await response.json()) as SyncMarkerResponse;
        return data?.lastSyncedCommit || data?.commitHash || null;
    } catch (error) {
        if (
            error instanceof Error &&
            (error.message.startsWith('Invalid API key') || error.message.startsWith('Project not found'))
        ) {
            throw error;
        }
        // On network/unknown error, return null and let sync proceed with full history.
        return null;
    }
}

/**
 * Save the last synced commit hash to the dashboard.
 */
export async function saveSyncMarker(
    dashboardUrl: string,
    apiToken: string,
    projectId: string,
    commitHash: string,
): Promise<void> {
    const url = new URL(`/api/projects/${projectId}/sync-marker`, dashboardUrl).toString();

    const response = await fetch(url, {
        method: 'POST',
        headers: makeAuthHeaders(apiToken),
        body: JSON.stringify({ commitHash }),
    });

    if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        throw new Error(
            `Failed to save sync marker: ${response.status} ${response.statusText}${
                errorBody ? ` - ${errorBody}` : ''
            }`,
        );
    }
}

export async function syncToDashboard(
    dashboardUrl: string,
    apiToken: string,
    payload: {
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
    },
): Promise<{ success: true; projectId: string; synced_at: string }> {
    const url = new URL(`/api/projects/${payload.projectId}/sync`, dashboardUrl).toString();
    const body = JSON.stringify(payload);

    const MAX_RETRIES = 3;
    const TIMEOUT_MS = 60_000; // 60 s per chunk
    const BASE_BACKOFF_MS = 1_000; // 1 s, doubles each retry

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: makeAuthHeaders(apiToken),
                body,
                signal: controller.signal,
            });

            if (!response.ok) {
                const errorBody = await response.text().catch(() => '');
                if (response.status === 401 || response.status === 403) {
                    throw new Error('Invalid API key. Please check your API_KEY.');
                }
                if (isProjectAccessError(errorBody)) {
                    throw projectAccessError(payload.projectId);
                }
                throw new Error(
                    `Sync failed with status ${response.status}: ${response.statusText}${errorBody ? ` - ${errorBody}` : ''}`,
                );
            }

            return response.json() as Promise<{ success: true; projectId: string; synced_at: string }>;
        } catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
            if (lastError.message.startsWith('Invalid API key') || lastError.message.startsWith('Project not found')) {
                throw lastError;
            }
            const isAbort = lastError.name === 'AbortError';
            if (isAbort) {
                lastError = new Error(`Upload timed out after ${TIMEOUT_MS / 1000}s`);
            }
            if (attempt < MAX_RETRIES) {
                const backoffMs = BASE_BACKOFF_MS * 2 ** (attempt - 1); // 1 s, 2 s
                console.warn(`[sync] Upload failed; retrying. ${lastError.message}`);
                await new Promise((resolve) => setTimeout(resolve, backoffMs));
            }
        } finally {
            clearTimeout(timer);
        }
    }

    throw lastError ?? new Error('Sync failed after retries');
}
