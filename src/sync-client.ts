// Sync client for posting data to dashboard

import { ProjectSyncRecord } from './types'

/**
 * Get the project sync baseline record from the dashboard.
 * Returns null if this is a new project (first sync).
 */
export async function getProjectSyncRecord(
  dashboardUrl: string,
  apiToken: string,
  projectId: string
): Promise<ProjectSyncRecord | null> {
  const url = new URL(`/api/projects/${projectId}/sync-record`, dashboardUrl).toString()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      // 404 is expected on first sync (no record yet)
      if (response.status === 404) return null
      const errorBody = await response.text().catch(() => '')
      throw new Error(`Failed with status ${response.status}${errorBody ? ` - ${errorBody}` : ''}`)
    }

    return (await response.json()) as ProjectSyncRecord
  } catch (error) {
    // On error, return null (treat as first sync)
    return null
  }
}

/**
 * Save the project sync baseline record to the dashboard (on first sync).
 * Saves the baseline stats and framework for consistency checks on future syncs.
 */
export async function saveProjectSyncRecord(
  dashboardUrl: string,
  apiToken: string,
  record: ProjectSyncRecord
): Promise<void> {
  const url = new URL(`/api/projects/${record.projectId}/sync-record`, dashboardUrl).toString()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(record),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    throw new Error(
      `Failed to save sync record: ${response.status} ${response.statusText}${
        errorBody ? ` - ${errorBody}` : ''
      }`
    )
  }
}

/**
 * Update the last synced commit in the project sync record.
 * Called after each sync to track incremental progress.
 */
export async function updateProjectLastSyncCommit(
  dashboardUrl: string,
  apiToken: string,
  projectId: string,
  commitHash: string
): Promise<void> {
  const url = new URL(`/api/projects/${projectId}/sync-record/last-sync`, dashboardUrl).toString()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  }

  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ lastSyncCommit: commitHash }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    throw new Error(
      `Failed to update sync record: ${response.status} ${response.statusText}${
        errorBody ? ` - ${errorBody}` : ''
      }`
    )
  }
}

/**
 * Get the last synced commit hash from the dashboard.
 * Returns null if no sync has been performed yet.
 */
export async function getSyncMarker(
  dashboardUrl: string,
  apiToken: string,
  projectId: string
): Promise<string | null> {
  const url = new URL(`/api/projects/${projectId}/sync-marker`, dashboardUrl).toString()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      // 404 is expected on first sync
      if (response.status === 404) return null
      const errorBody = await response.text().catch(() => '')
      throw new Error(`Failed with status ${response.status}${errorBody ? ` - ${errorBody}` : ''}`)
    }

    const data = (await response.json()) as any
    return data?.lastSyncedCommit || data?.commitHash || null
  } catch (error) {
    // On error, return null and let sync proceed with full history
    return null
  }
}

/**
 * Save the last synced commit hash to the dashboard.
 */
export async function saveSyncMarker(
  dashboardUrl: string,
  apiToken: string,
  projectId: string,
  commitHash: string
): Promise<void> {
  const url = new URL(`/api/projects/${projectId}/sync-marker`, dashboardUrl).toString()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ commitHash }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    throw new Error(
      `Failed to save sync marker: ${response.status} ${response.statusText}${
        errorBody ? ` - ${errorBody}` : ''
      }`
    )
  }
}

export async function syncToDashboard(
  dashboardUrl: string,
  apiToken: string,
  payload: {
    projectId: string
    specs: unknown[]
    history: unknown[]
    stats: unknown
    timestamp: string
  }
): Promise<{ success: true; projectId: string; synced_at: string }> {
  const url = new URL(`/api/projects/${payload.projectId}/sync`, dashboardUrl).toString()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    throw new Error(
      `Sync failed with status ${response.status}: ${response.statusText}${
        errorBody ? ` - ${errorBody}` : ''
      }`
    )
  }

  return response.json() as Promise<{ success: true; projectId: string; synced_at: string }>
}
