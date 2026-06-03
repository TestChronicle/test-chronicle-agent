import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_DASHBOARD_URL, projectConfigPath, readProjectConfig, writeProjectConfig } from '../src/config';
import { credentialsPath, removeCredential, saveCredential } from '../src/credentials';
import { resolveSyncCredentials, runCli } from '../src/cli';

function tempDir(prefix: string): string {
    return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

const originalConfigHome = process.env.TESTCHRONICLE_CONFIG_HOME;

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    if (originalConfigHome === undefined) {
        delete process.env.TESTCHRONICLE_CONFIG_HOME;
    } else {
        process.env.TESTCHRONICLE_CONFIG_HOME = originalConfigHome;
    }
});

describe('CLI credential resolution', () => {
    it('writes only the project ID to local project config', () => {
        const cwd = tempDir('tc-cli-write-');
        writeProjectConfig({ projectId: 'local-project' }, cwd);

        expect(JSON.parse(fs.readFileSync(projectConfigPath(cwd), 'utf8'))).toEqual({
            projectId: 'local-project',
        });
    });

    it('reads project ID only config', () => {
        const cwd = tempDir('tc-cli-read-');
        fs.writeFileSync(projectConfigPath(cwd), JSON.stringify({ projectId: 'local-project' }), 'utf8');

        expect(readProjectConfig(cwd)).toEqual({ projectId: 'local-project' });
    });

    it('tolerates legacy configs with dashboardUrl but ignores it', () => {
        const cwd = tempDir('tc-cli-legacy-');
        fs.writeFileSync(
            projectConfigPath(cwd),
            JSON.stringify({ projectId: 'local-project', dashboardUrl: 'https://legacy.example' }),
            'utf8',
        );

        expect(readProjectConfig(cwd)).toEqual({ projectId: 'local-project' });
    });

    it('prefers environment credentials over local config', async () => {
        const cwd = tempDir('tc-cli-env-');
        const localConfig = { projectId: 'local-project' };
        writeProjectConfig(localConfig, cwd);

        const result = await resolveSyncCredentials({
            argv: [],
            cwd,
            env: {
                API_KEY: 'env-token',
                PROJECT_ID: 'env-project',
                CHRONICLE_DASHBOARD_URL: 'https://env.example',
            },
        });

        expect(result).toEqual({
            apiKey: 'env-token',
            projectId: 'env-project',
            dashboardUrl: 'https://env.example',
            source: 'env',
        });
    });

    it('uses linked project config and global token store when env credentials are absent', async () => {
        const cwd = tempDir('tc-cli-local-');
        process.env.TESTCHRONICLE_CONFIG_HOME = tempDir('tc-cli-creds-');
        const localConfig = { projectId: 'local-project' };
        writeProjectConfig(localConfig, cwd);
        saveCredential(localConfig, 'tc_agent_secret');

        const result = await resolveSyncCredentials({ argv: [], cwd, env: {} });

        expect(result).toEqual({
            apiKey: 'tc_agent_secret',
            projectId: 'local-project',
            dashboardUrl: DEFAULT_DASHBOARD_URL,
            source: 'local',
        });
        expect(fs.existsSync(credentialsPath())).toBe(true);
    });

    it('uses the development dashboard URL override for local credentials', async () => {
        const cwd = tempDir('tc-cli-local-dev-url-');
        process.env.TESTCHRONICLE_CONFIG_HOME = tempDir('tc-cli-dev-url-creds-');
        const localConfig = { projectId: 'local-project' };
        writeProjectConfig(localConfig, cwd);
        saveCredential(localConfig, 'tc_agent_secret');

        const result = await resolveSyncCredentials({
            argv: [],
            cwd,
            env: { CHRONICLE_DASHBOARD_URL: 'http://localhost:3000/' },
        });

        expect(result).toEqual({
            apiKey: 'tc_agent_secret',
            projectId: 'local-project',
            dashboardUrl: 'http://localhost:3000',
            source: 'local',
        });
    });

    it('uses the dashboard URL flag override for local sync credentials', async () => {
        const cwd = tempDir('tc-cli-local-dev-url-flag-');
        process.env.TESTCHRONICLE_CONFIG_HOME = tempDir('tc-cli-dev-url-flag-creds-');
        const localConfig = { projectId: 'local-project' };
        writeProjectConfig(localConfig, cwd);
        saveCredential(localConfig, 'tc_agent_secret');

        const result = await resolveSyncCredentials({
            argv: ['sync', '--dashboard-url', 'http://localhost:3000/'],
            cwd,
            env: {},
        });

        expect(result).toEqual({
            apiKey: 'tc_agent_secret',
            projectId: 'local-project',
            dashboardUrl: 'http://localhost:3000',
            source: 'local',
        });
    });

    it('uses the dashboard URL flag override for environment sync credentials', async () => {
        const result = await resolveSyncCredentials({
            argv: ['sync', '--dashboard-url', 'http://localhost:3000/'],
            cwd: tempDir('tc-cli-env-dev-url-flag-'),
            env: {
                API_KEY: 'env-token',
                PROJECT_ID: 'env-project',
            },
        });

        expect(result).toEqual({
            apiKey: 'env-token',
            projectId: 'env-project',
            dashboardUrl: 'http://localhost:3000',
            source: 'env',
        });
    });

    it('matches stored local credentials by project ID only', async () => {
        const cwd = tempDir('tc-cli-project-key-');
        process.env.TESTCHRONICLE_CONFIG_HOME = tempDir('tc-cli-project-key-creds-');
        const localConfig = { projectId: 'local-project' };
        writeProjectConfig(localConfig, cwd);
        saveCredential({ projectId: 'local-project' }, 'first-token');
        saveCredential({ projectId: 'local-project' }, 'replacement-token');

        const result = await resolveSyncCredentials({ argv: [], cwd, env: {} });

        expect(result.apiKey).toBe('replacement-token');
    });

    it('throws a helpful error when the project is linked but the token is missing', async () => {
        const cwd = tempDir('tc-cli-missing-');
        process.env.TESTCHRONICLE_CONFIG_HOME = tempDir('tc-cli-empty-creds-');
        const localConfig = { projectId: 'local-project' };
        writeProjectConfig(localConfig, cwd);
        removeCredential(localConfig);

        await expect(resolveSyncCredentials({ argv: [], cwd, env: {} })).rejects.toThrow(
            'No local credential found',
        );
    });

    it('uses login dashboard URL override without writing it to project config', async () => {
        const cwd = tempDir('tc-cli-login-');
        process.env.TESTCHRONICLE_CONFIG_HOME = tempDir('tc-cli-login-creds-');
        const fetchSpy = vi
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () =>
                    Promise.resolve({
                        deviceCode: 'tc_agent_secret',
                        userCode: 'ABCD1234',
                        approveUrl: 'http://localhost:3000/cli/login?code=ABCD1234',
                        expiresAt: new Date(Date.now() + 60_000).toISOString(),
                        pollIntervalSeconds: 1,
                    }),
            })
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ status: 'approved', projectId: 'linked-project' }),
            });
        vi.stubGlobal('fetch', fetchSpy);
        const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        await runCli({
            argv: ['login', '--dashboard-url', 'http://localhost:3000/', '--no-open'],
            cwd,
            env: {},
        });

        expect(fetchSpy.mock.calls[0][0].toString()).toBe('http://localhost:3000/api/cli-login/start');
        expect(JSON.parse(fs.readFileSync(projectConfigPath(cwd), 'utf8'))).toEqual({
            projectId: 'linked-project',
        });
        expect(consoleLog.mock.calls.flat()).toEqual(
            expect.arrayContaining([
                '[login] Waiting for browser approval.',
                '[login] Linked project: linked-project',
                `[login] Config saved: ${projectConfigPath(cwd)}`,
                '[login] Next: npx testchronicle@latest sync',
            ]),
        );
    });

    it('does not print polling dots while waiting for browser approval', async () => {
        const cwd = tempDir('tc-cli-quiet-login-');
        process.env.TESTCHRONICLE_CONFIG_HOME = tempDir('tc-cli-quiet-login-creds-');
        const fetchSpy = vi
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () =>
                    Promise.resolve({
                        deviceCode: 'tc_agent_secret',
                        userCode: 'ABCD1234',
                        approveUrl: 'http://localhost:3000/cli/login?code=ABCD1234',
                        expiresAt: new Date(Date.now() + 60_000).toISOString(),
                        pollIntervalSeconds: 1,
                    }),
            })
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ status: 'pending' }),
            })
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ status: 'approved', projectId: 'linked-project' }),
            });
        vi.stubGlobal('fetch', fetchSpy);
        vi.spyOn(console, 'log').mockImplementation(() => {});
        const stdoutWrite = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

        await runCli({
            argv: ['login', '--dashboard-url', 'http://localhost:3000/', '--no-open'],
            cwd,
            env: {},
        });

        expect(stdoutWrite).not.toHaveBeenCalled();
    });
});
