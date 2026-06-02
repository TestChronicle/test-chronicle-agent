export type LoginStatus = 'pending' | 'approved' | 'denied' | 'expired';

export interface StartLoginRequest {
    projectName: string;
    repoUrl?: string;
}

export interface StartLoginResponse {
    deviceCode: string;
    userCode: string;
    approveUrl: string;
    expiresAt: string;
    pollIntervalSeconds?: number;
}

export interface PollLoginResponse {
    status: LoginStatus;
    projectId?: string;
    dashboardUrl?: string;
}

export async function startBrowserLogin(
    dashboardUrl: string,
    request: StartLoginRequest,
): Promise<StartLoginResponse> {
    const response = await fetch(new URL('/api/cli-login/start', dashboardUrl), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to start login (${response.status})${body ? ` - ${body}` : ''}`);
    }

    return (await response.json()) as StartLoginResponse;
}

export async function pollBrowserLogin(dashboardUrl: string, deviceCode: string): Promise<PollLoginResponse> {
    const response = await fetch(new URL('/api/cli-login/poll', dashboardUrl), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceCode }),
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to poll login (${response.status})${body ? ` - ${body}` : ''}`);
    }

    return (await response.json()) as PollLoginResponse;
}
