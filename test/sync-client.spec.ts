import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchProjectConfig, getSyncMarker, syncToDashboard, validateProjectAccess } from '../src/sync-client';

const DASHBOARD_URL = 'https://example.com';
const API_TOKEN = 'test-token';
const PROJECT_ID = 'proj-123';

function mockFetch(status: number, body: unknown) {
    const text = typeof body === 'string' ? body : JSON.stringify(body);
    return vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
            ok: status >= 200 && status < 300,
            status,
            statusText: status === 404 ? 'Not Found' : 'OK',
            json: () => Promise.resolve(body),
            text: () => Promise.resolve(text),
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

    it('continues when the config endpoint returns 404 without a project access error', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        mockFetch(404, 'Not Found');

        await expect(validateProjectAccess(DASHBOARD_URL, API_TOKEN, PROJECT_ID)).resolves.toBeUndefined();

        expect(warnSpy).toHaveBeenCalledWith('[sync] Could not fetch project config (404); using auto-detected settings.');
    });

    it('rejects when the config endpoint returns a project access 404', async () => {
        mockFetch(404, { error: "Project not found or not in the key's team" });

        await expect(validateProjectAccess(DASHBOARD_URL, API_TOKEN, PROJECT_ID)).rejects.toThrow(
            'Project not found or not available to this API key: proj-123.',
        );
    });
});

describe('getSyncMarker', () => {
    it('returns null for a first sync marker 404', async () => {
        mockFetch(404, 'Not Found');

        await expect(getSyncMarker(DASHBOARD_URL, API_TOKEN, PROJECT_ID)).resolves.toBeNull();
    });

    it('rejects when the marker endpoint returns a project access 404', async () => {
        mockFetch(404, { error: "Project not found or not in the key's team" });

        await expect(getSyncMarker(DASHBOARD_URL, API_TOKEN, PROJECT_ID)).rejects.toThrow(
            'Project not found or not available to this API key: proj-123.',
        );
    });
});

describe('syncToDashboard', () => {
    const payload = {
        projectId: PROJECT_ID,
        specs: [],
        history: [],
        stats: {},
        timestamp: '2026-06-19T00:00:00.000Z',
        syncId: 'sync:proj-123:2026-06-19T00:00:00.000Z',
        source: 'local_cli' as const,
        agentVersion: '0.1.0',
        payloadSchemaVersion: '2026-07',
        branch: 'main',
        repositoryDefaultBranch: 'main',
        latestCommitHash: 'abcdef1234567890',
        commitRangeStart: '1111111111111111',
        commitRangeEnd: 'abcdef1234567890',
        chunkIndex: 0,
        isLastChunk: true,
        expectedChunkCount: 1,
        warnings: [],
    };

    it('posts the strict v1 sync metadata contract', async () => {
        const fetchSpy = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: () => Promise.resolve({ success: true, projectId: PROJECT_ID, synced_at: payload.timestamp }),
        });
        vi.stubGlobal('fetch', fetchSpy);

        await syncToDashboard(DASHBOARD_URL, API_TOKEN, payload);

        const request = fetchSpy.mock.calls[0][1] as RequestInit;
        const body = JSON.parse(request.body as string);
        expect(body).toMatchObject({
            syncId: payload.syncId,
            source: 'local_cli',
            agentVersion: '0.1.0',
            payloadSchemaVersion: '2026-07',
            branch: 'main',
            repositoryDefaultBranch: 'main',
            latestCommitHash: payload.latestCommitHash,
            commitRangeStart: payload.commitRangeStart,
            commitRangeEnd: payload.commitRangeEnd,
            expectedChunkCount: 1,
        });
    });

    it('rejects project access errors without retrying', async () => {
        mockFetch(404, { error: "Project not found or not in the key's team" });

        await expect(syncToDashboard(DASHBOARD_URL, API_TOKEN, payload)).rejects.toThrow(
            'Project not found or not available to this API key: proj-123.',
        );

        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
