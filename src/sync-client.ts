// Sync client for posting data to dashboard
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
    'x-api-key': apiToken,
  }
  
  console.log('Sending sync request to:', url)
  console.log('Headers:', headers)

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
