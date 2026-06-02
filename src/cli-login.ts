import {
    isVercelAuthenticationResponse,
    vercelAuthenticationError,
    withVercelProtectionBypassHeader,
    withVercelProtectionBypassQuery,
} from './vercel-protection';

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

export interface LoginRequestOptions {
    vercelProtectionBypass?: string;
}

export async function startBrowserLogin(
    dashboardUrl: string,
    request: StartLoginRequest,
    options: LoginRequestOptions = {},
): Promise<StartLoginResponse> {
    const response = await fetch(new URL('/api/cli-login/start', dashboardUrl), {
        method: 'POST',
        headers: withVercelProtectionBypassHeader(
            { 'Content-Type': 'application/json' },
            options.vercelProtectionBypass,
        ),
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        if (isVercelAuthenticationResponse(response.status, body)) {
            throw vercelAuthenticationError('start login');
        }
        throw new Error(`Failed to start login (${response.status})${body ? ` - ${body}` : ''}`);
    }

    const session = (await response.json()) as StartLoginResponse;
    return {
        ...session,
        approveUrl: withVercelProtectionBypassQuery(session.approveUrl, options.vercelProtectionBypass, true),
    };
}

export async function pollBrowserLogin(
    dashboardUrl: string,
    deviceCode: string,
    options: LoginRequestOptions = {},
): Promise<PollLoginResponse> {
    const response = await fetch(new URL('/api/cli-login/poll', dashboardUrl), {
        method: 'POST',
        headers: withVercelProtectionBypassHeader(
            { 'Content-Type': 'application/json' },
            options.vercelProtectionBypass,
        ),
        body: JSON.stringify({ deviceCode }),
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        if (isVercelAuthenticationResponse(response.status, body)) {
            throw vercelAuthenticationError('poll login');
        }
        throw new Error(`Failed to poll login (${response.status})${body ? ` - ${body}` : ''}`);
    }

    return (await response.json()) as PollLoginResponse;
}
