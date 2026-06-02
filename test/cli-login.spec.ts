import { afterEach, describe, expect, it, vi } from 'vitest';
import { pollBrowserLogin, startBrowserLogin } from '../src/cli-login';

const DASHBOARD_URL = 'https://preview.example.com';
const BYPASS_TOKEN = 'vercel-bypass-token';

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('CLI browser login', () => {
    it('sends the Vercel bypass header and appends browser bypass params to the approval URL', async () => {
        const session = {
            deviceCode: 'tc_agent_secret',
            userCode: 'ABCD1234',
            approveUrl: `${DASHBOARD_URL}/cli/login?code=ABCD1234`,
            expiresAt: new Date(Date.now() + 60_000).toISOString(),
            pollIntervalSeconds: 2,
        };
        const fetchSpy = vi.fn().mockResolvedValue(
            new Response(JSON.stringify(session), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }),
        );
        vi.stubGlobal('fetch', fetchSpy);

        const result = await startBrowserLogin(
            DASHBOARD_URL,
            { projectName: 'repo' },
            { vercelProtectionBypass: BYPASS_TOKEN },
        );

        expect(fetchSpy).toHaveBeenCalledWith(
            new URL('/api/cli-login/start', DASHBOARD_URL),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'x-vercel-protection-bypass': BYPASS_TOKEN,
                }),
            }),
        );
        const approveUrl = new URL(result.approveUrl);
        expect(approveUrl.searchParams.get('x-vercel-protection-bypass')).toBe(BYPASS_TOKEN);
        expect(approveUrl.searchParams.get('x-vercel-set-bypass-cookie')).toBe('true');
    });

    it('sends the Vercel bypass header while polling', async () => {
        const fetchSpy = vi.fn().mockResolvedValue(
            new Response(JSON.stringify({ status: 'pending' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }),
        );
        vi.stubGlobal('fetch', fetchSpy);

        await pollBrowserLogin(DASHBOARD_URL, 'tc_agent_secret', { vercelProtectionBypass: BYPASS_TOKEN });

        expect(fetchSpy).toHaveBeenCalledWith(
            new URL('/api/cli-login/poll', DASHBOARD_URL),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'x-vercel-protection-bypass': BYPASS_TOKEN,
                }),
            }),
        );
    });

    it('reports Vercel deployment protection without dumping the HTML response', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(
                new Response('<title>Authentication Required</title><p>Vercel Authentication</p>', {
                    status: 401,
                    headers: { 'Content-Type': 'text/html' },
                }),
            ),
        );

        await expect(startBrowserLogin(DASHBOARD_URL, { projectName: 'repo' })).rejects.toThrow(
            'Vercel Deployment Protection',
        );
    });
});
