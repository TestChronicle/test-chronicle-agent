// Sync client for posting data to dashboard

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
      throw new Error(`Failed with status ${response.status}`)
    }

    const data = (await response.json()) as { lastSyncedCommit: string | null }
    return data.lastSyncedCommit
  } catch {
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
