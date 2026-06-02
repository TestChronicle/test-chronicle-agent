export const VERCEL_PROTECTION_BYPASS_HEADER = 'x-vercel-protection-bypass';
export const VERCEL_PROTECTION_BYPASS_PARAM = 'x-vercel-protection-bypass';
export const VERCEL_SET_BYPASS_COOKIE_PARAM = 'x-vercel-set-bypass-cookie';

const VERCEL_BYPASS_ENV_VARS = [
    'CHRONICLE_VERCEL_BYPASS_TOKEN',
    'VERCEL_AUTOMATION_BYPASS_SECRET',
    'VERCEL_PROTECTION_BYPASS',
    'VERCEL_PROTECTION_BYPASS_TOKEN',
] as const;

export function vercelProtectionBypassFromEnv(env: NodeJS.ProcessEnv): string | undefined {
    for (const name of VERCEL_BYPASS_ENV_VARS) {
        const value = env[name]?.trim();
        if (value) return value;
    }
    return undefined;
}

export function withVercelProtectionBypassHeader(
    headers: Record<string, string>,
    vercelProtectionBypass?: string,
): Record<string, string> {
    if (!vercelProtectionBypass) return headers;
    return {
        ...headers,
        [VERCEL_PROTECTION_BYPASS_HEADER]: vercelProtectionBypass,
    };
}

export function withVercelProtectionBypassQuery(
    url: string,
    vercelProtectionBypass?: string,
    setBypassCookie = false,
): string {
    if (!vercelProtectionBypass) return url;
    const nextUrl = new URL(url);
    nextUrl.searchParams.set(VERCEL_PROTECTION_BYPASS_PARAM, vercelProtectionBypass);
    if (setBypassCookie) {
        nextUrl.searchParams.set(VERCEL_SET_BYPASS_COOKIE_PARAM, 'true');
    }
    return nextUrl.toString();
}

export function isVercelAuthenticationResponse(status: number, body: string): boolean {
    if (status !== 401 && status !== 403) return false;
    return (
        body.includes('Vercel Authentication') ||
        body.includes('Authentication Required') ||
        body.includes('x-vercel-protection-bypass')
    );
}

export function vercelAuthenticationError(action: string): Error {
    return new Error(
        `Failed to ${action}: the dashboard URL is protected by Vercel Deployment Protection. ` +
            `Use the production dashboard URL, disable protection for the preview deployment, or pass a Vercel ` +
            `automation bypass token with --vercel-bypass-token or CHRONICLE_VERCEL_BYPASS_TOKEN.`,
    );
}
