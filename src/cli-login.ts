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

function getCauseCode(error: unknown): string | null {
    const cause =
        error instanceof Error && 'cause' in error ? (error as Error & { cause?: unknown }).cause : undefined;
    if (!cause || typeof cause !== 'object' || !('code' in cause)) return null;

    const code = (cause as { code?: unknown }).code;
    return typeof code === 'string' && /^[A-Z0-9_]+$/.test(code) ? code : null;
}

function loginNetworkError(message: string, dashboardUrl: string, error: unknown): Error {
    const code = getCauseCode(error);
    const wrapped = new Error(
        `${message} at ${dashboardUrl}. Check --dashboard-url or CHRONICLE_DASHBOARD_URL.${code ? ` (${code})` : ''}`,
    );
    (wrapped as Error & { cause?: unknown }).cause = error;
    return wrapped;
}

export async function startBrowserLogin(
    dashboardUrl: string,
    request: StartLoginRequest,
): Promise<StartLoginResponse> {
    let response: Response;
    try {
        response = await fetch(new URL('/api/cli-login/start', dashboardUrl), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
    } catch (error) {
        throw loginNetworkError('Could not reach Test Chronicle login', dashboardUrl, error);
    }

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to start login (${response.status})${body ? ` - ${body}` : ''}`);
    }

    return (await response.json()) as StartLoginResponse;
}

export async function pollBrowserLogin(dashboardUrl: string, deviceCode: string): Promise<PollLoginResponse> {
    let response: Response;
    try {
        response = await fetch(new URL('/api/cli-login/poll', dashboardUrl), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deviceCode }),
        });
    } catch (error) {
        throw loginNetworkError('Could not reach Test Chronicle login status', dashboardUrl, error);
    }

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to poll login (${response.status})${body ? ` - ${body}` : ''}`);
    }

    return (await response.json()) as PollLoginResponse;
}
