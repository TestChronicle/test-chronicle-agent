import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchProjectConfig, validateProjectAccess } from '../src/sync-client';

const DASHBOARD_URL = 'https://example.com';
const API_TOKEN = 'test-token';
const PROJECT_ID = 'proj-123';

function mockFetch(status: number, body: unknown) {
    return vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
            ok: status >= 200 && status < 300,
            status,
            json: () => Promise.resolve(body),
        }),
    );
}

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe('fetchProjectConfig', () => {
    it('returns parsed config when the dashboard responds with 200', async () => {
        const config = { frameworkOverrides: [{ framework: 'playwright', dirs: ['e2e/'] }] };
        mockFetch(200, config);

        const result = await fetchProjectConfig(DASHBOARD_URL, API_TOKEN, PROJECT_ID);

        expect(result).toEqual(config);
    });

    it('returns an empty object {} (no overrides set) as a valid config', async () => {
        mockFetch(200, {});

        const result = await fetchProjectConfig(DASHBOARD_URL, API_TOKEN, PROJECT_ID);

        expect(result).toEqual({});
    });

    it('returns null when the dashboard responds with a non-OK status', async () => {
        mockFetch(401, { error: 'Unauthorized' });

        const result = await fetchProjectConfig(DASHBOARD_URL, API_TOKEN, PROJECT_ID);

        expect(result).toBeNull();
    });

    it('returns null on a 500 error so the agent falls back to auto-detection', async () => {
        mockFetch(500, { error: 'Internal Server Error' });

        const result = await fetchProjectConfig(DASHBOARD_URL, API_TOKEN, PROJECT_ID);

        expect(result).toBeNull();
    });

    it('returns null on a network error (fetch throws)', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED')));

        const result = await fetchProjectConfig(DASHBOARD_URL, API_TOKEN, PROJECT_ID);

        expect(result).toBeNull();
    });

    it('calls the correct endpoint URL', async () => {
        const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve({}) });
        vi.stubGlobal('fetch', fetchSpy);

        await fetchProjectConfig(DASHBOARD_URL, API_TOKEN, PROJECT_ID);

        expect(fetchSpy).toHaveBeenCalledWith(
            `${DASHBOARD_URL}/api/projects/${PROJECT_ID}/config`,
            expect.objectContaining({
                method: 'GET',
                headers: expect.objectContaining({ Authorization: `Bearer ${API_TOKEN}` }),
            }),
        );
    });
});

describe('validateProjectAccess', () => {
    it('rejects invalid API keys', async () => {
        mockFetch(401, { error: 'Unauthorized' });

        await expect(validateProjectAccess(DASHBOARD_URL, API_TOKEN, PROJECT_ID)).rejects.toThrow(
            'Invalid API key. Please check your API_KEY.',
        );
    });

    it('continues when the config endpoint returns 404', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        mockFetch(404, { error: 'Not Found' });

        await expect(validateProjectAccess(DASHBOARD_URL, API_TOKEN, PROJECT_ID)).resolves.toBeUndefined();

        expect(warnSpy).toHaveBeenCalledWith('[sync] Could not validate project config access (404); continuing.');
    });
});
