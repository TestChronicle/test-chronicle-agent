import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { writeProjectConfig } from '../src/config';
import { credentialsPath, removeCredential, saveCredential } from '../src/credentials';
import { resolveSyncCredentials } from '../src/cli';

function tempDir(prefix: string): string {
    return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

const originalConfigHome = process.env.TESTCHRONICLE_CONFIG_HOME;

afterEach(() => {
    if (originalConfigHome === undefined) {
        delete process.env.TESTCHRONICLE_CONFIG_HOME;
    } else {
        process.env.TESTCHRONICLE_CONFIG_HOME = originalConfigHome;
    }
});

describe('CLI credential resolution', () => {
    it('prefers environment credentials over local config', async () => {
        const cwd = tempDir('tc-cli-env-');
        const localConfig = { projectId: 'local-project', dashboardUrl: 'https://local.example' };
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
        const localConfig = { projectId: 'local-project', dashboardUrl: 'https://local.example' };
        writeProjectConfig(localConfig, cwd);
        saveCredential(localConfig, 'tc_agent_secret');

        const result = await resolveSyncCredentials({ argv: [], cwd, env: {} });

        expect(result).toEqual({
            apiKey: 'tc_agent_secret',
            projectId: 'local-project',
            dashboardUrl: 'https://local.example',
            source: 'local',
        });
        expect(fs.existsSync(credentialsPath())).toBe(true);
    });

    it('throws a helpful error when the project is linked but the token is missing', async () => {
        const cwd = tempDir('tc-cli-missing-');
        process.env.TESTCHRONICLE_CONFIG_HOME = tempDir('tc-cli-empty-creds-');
        const localConfig = { projectId: 'local-project', dashboardUrl: 'https://local.example' };
        writeProjectConfig(localConfig, cwd);
        removeCredential(localConfig);

        await expect(resolveSyncCredentials({ argv: [], cwd, env: {} })).rejects.toThrow(
            'No local credential found',
        );
    });
});
