// Sync client for posting data to dashboard

import { DashboardSyncConfig } from './types';

interface SyncMarkerResponse {
    lastSyncedCommit?: string;
    commitHash?: string;
}

function makeAuthHeaders(apiToken: string): Record<string, string> {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
    };
}

/**
 * Validates that the API key and project ID are correct by hitting the config
 * endpoint early. Throws a descriptive error on auth failure or unknown project
 * so the sync fails fast before doing any expensive local work.
 */
export async function validateProjectAccess(
    dashboardUrl: string,
    apiToken: string,
    projectId: string,
): Promise<void> {
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
            throw new Error(
                `Project not found: ${projectId}. Please check your PROJECT_ID.`,
            );
        }
        if (!response.ok) {
            console.warn(`[sync] Warning: Could not validate project access (${response.status}). Proceeding anyway.`);
        }
    } catch (error) {
        if (
            error instanceof Error &&
            (error.message.startsWith('Invalid API key') || error.message.startsWith('Project not found'))
        ) {
            throw error;
        }
        // Network / unreachable — warn and let the sync attempt proceed
        console.warn('[sync] Warning: Could not reach dashboard to validate project access. Proceeding anyway.');
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
            // 404 is expected on first sync
            if (response.status === 404) return null;
            const errorBody = await response.text().catch(() => '');
            throw new Error(`Failed with status ${response.status}${errorBody ? ` - ${errorBody}` : ''}`);
        }

        const data = (await response.json()) as SyncMarkerResponse;
        return data?.lastSyncedCommit || data?.commitHash || null;
    } catch (error) {
        // On error, return null and let sync proceed with full history
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
        repoUrl?: string;
    },
): Promise<{ success: true; projectId: string; synced_at: string }> {
    const url = new URL(`/api/projects/${payload.projectId}/sync`, dashboardUrl).toString();

    const response = await fetch(url, {
        method: 'POST',
        headers: makeAuthHeaders(apiToken),
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        throw new Error(
            `Sync failed with status ${response.status}: ${response.statusText}${errorBody ? ` - ${errorBody}` : ''}`,
        );
    }

    return response.json() as Promise<{ success: true; projectId: string; synced_at: string }>;
}
