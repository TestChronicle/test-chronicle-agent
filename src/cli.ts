import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import { config as loadDotenv } from 'dotenv';
import { syncProject, SyncOptions } from './sync';
import {
    DEFAULT_DASHBOARD_URL,
    PROJECT_CONFIG_FILE,
    dashboardUrlFromEnv,
    projectConfigPath,
    readProjectConfig,
    resolveEnvCredentials,
    writeProjectConfig,
} from './config';
import { removeCredential, resolveLocalCredentials, saveCredential, credentialsPath } from './credentials';
import { pollBrowserLogin, startBrowserLogin } from './cli-login';
import { getRepoUrl } from './git';
import { vercelProtectionBypassFromEnv } from './vercel-protection';

interface CliContext {
    argv: string[];
    env: NodeJS.ProcessEnv;
    cwd: string;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFlag(args: string[], name: string): string | null {
    const index = args.indexOf(name);
    if (index === -1) return null;
    return args[index + 1] && !args[index + 1].startsWith('--') ? args[index + 1] : '';
}

function hasFlag(args: string[], name: string): boolean {
    return args.includes(name);
}

function printHelp(): void {
    console.log(`Test Chronicle CLI

Usage:
  testchronicle login [--dashboard-url <url>] [--no-open] [--vercel-bypass-token <token>]
  testchronicle sync
  testchronicle status
  testchronicle logout [--remove-config]

Environment overrides:
  API_KEY, PROJECT_ID, CHRONICLE_DASHBOARD_URL
  CHRONICLE_VERCEL_BYPASS_TOKEN, VERCEL_AUTOMATION_BYPASS_SECRET

Local config:
  ${PROJECT_CONFIG_FILE}`);
}

function openBrowser(url: string): void {
    const command =
        process.platform === 'win32'
            ? { file: 'cmd', args: ['/c', 'start', '', url] }
            : process.platform === 'darwin'
              ? { file: 'open', args: [url] }
              : { file: 'xdg-open', args: [url] };

    const child = execFile(command.file, command.args, { windowsHide: true }, () => {});
    child.unref();
}

export async function resolveSyncCredentials(ctx: CliContext): Promise<SyncOptions & { source: 'env' | 'local' }> {
    const envCredentials = resolveEnvCredentials(ctx.env);
    if (envCredentials) return envCredentials;

    const projectConfig = readProjectConfig(ctx.cwd);
    if (!projectConfig) {
        throw new Error(
            `No Test Chronicle project is linked. Run "testchronicle login" or set API_KEY and PROJECT_ID.`,
        );
    }

    const localCredentials = resolveLocalCredentials(projectConfig);
    if (!localCredentials) {
        throw new Error(
            `No local credential found for project ${projectConfig.projectId}. Run "testchronicle login" again.`,
        );
    }

    const vercelProtectionBypass = vercelProtectionBypassFromEnv(ctx.env);
    return {
        ...localCredentials,
        ...(vercelProtectionBypass ? { vercelProtectionBypass } : {}),
    };
}

async function runSync(ctx: CliContext): Promise<void> {
    const { source, ...options } = await resolveSyncCredentials(ctx);
    console.log(`[cli] Using ${source === 'env' ? 'environment' : 'local project'} credentials`);
    await syncProject(options);
}

async function runLogin(ctx: CliContext): Promise<void> {
    const dashboardUrl = (getFlag(ctx.argv, '--dashboard-url') || dashboardUrlFromEnv(ctx.env) || DEFAULT_DASHBOARD_URL).replace(
        /\/$/,
        '',
    );
    const vercelProtectionBypass =
        getFlag(ctx.argv, '--vercel-bypass-token') || vercelProtectionBypassFromEnv(ctx.env);
    const repoUrl = await getRepoUrl(ctx.cwd);
    const projectName = path.basename(ctx.cwd);
    const session = await startBrowserLogin(
        dashboardUrl,
        {
            projectName,
            ...(repoUrl ? { repoUrl } : {}),
        },
        {
            vercelProtectionBypass,
        },
    );

    console.log(`Open this URL to link your project:\n${session.approveUrl}`);
    console.log(`Code: ${session.userCode}`);

    if (!hasFlag(ctx.argv, '--no-open')) {
        try {
            openBrowser(session.approveUrl);
        } catch {
            console.log('[login] Could not open a browser automatically.');
        }
    }

    const expiresAt = new Date(session.expiresAt).getTime();
    const intervalMs = Math.max(1, session.pollIntervalSeconds ?? 2) * 1000;

    while (Date.now() < expiresAt) {
        await sleep(intervalMs);
        const result = await pollBrowserLogin(dashboardUrl, session.deviceCode, {
            vercelProtectionBypass,
        });

        if (result.status === 'pending') {
            process.stdout.write('.');
            continue;
        }
        process.stdout.write('\n');

        if (result.status === 'approved' && result.projectId) {
            const linkedConfig = {
                projectId: result.projectId,
                dashboardUrl: (result.dashboardUrl || dashboardUrl).replace(/\/$/, ''),
            };
            writeProjectConfig(linkedConfig, ctx.cwd);
            saveCredential(linkedConfig, session.deviceCode);
            console.log(`[login] Linked project ${linkedConfig.projectId}`);
            console.log(`[login] Wrote ${PROJECT_CONFIG_FILE}`);
            console.log(`[login] Stored credentials at ${credentialsPath()}`);
            return;
        }

        throw new Error(`Login ${result.status}`);
    }

    throw new Error('Login expired before approval');
}

function runStatus(ctx: CliContext): void {
    const envCredentials = resolveEnvCredentials(ctx.env);
    if (envCredentials) {
        console.log('Test Chronicle status');
        console.log(`  Source: environment`);
        console.log(`  Project: ${envCredentials.projectId}`);
        console.log(`  Dashboard: ${envCredentials.dashboardUrl}`);
        return;
    }

    const projectConfig = readProjectConfig(ctx.cwd);
    if (!projectConfig) {
        console.log('No Test Chronicle project linked.');
        return;
    }

    const hasCredential = !!resolveLocalCredentials(projectConfig);
    console.log('Test Chronicle status');
    console.log(`  Source: local project`);
    console.log(`  Project: ${projectConfig.projectId}`);
    console.log(`  Dashboard: ${projectConfig.dashboardUrl}`);
    console.log(`  Credential: ${hasCredential ? 'stored' : 'missing'}`);
}

function runLogout(ctx: CliContext): void {
    const projectConfig = readProjectConfig(ctx.cwd);
    if (!projectConfig) {
        console.log('No Test Chronicle project linked.');
        return;
    }

    const removed = removeCredential(projectConfig);
    if (hasFlag(ctx.argv, '--remove-config')) {
        const configPath = projectConfigPath(ctx.cwd);
        if (fs.existsSync(configPath)) fs.unlinkSync(configPath);
    }

    console.log(removed ? 'Removed stored Test Chronicle credential.' : 'No stored credential found.');
}

export async function runCli(ctx: CliContext): Promise<void> {
    const command = ctx.argv[0] ?? 'sync';

    switch (command) {
        case 'sync':
            await runSync(ctx);
            return;
        case 'login':
            await runLogin(ctx);
            return;
        case 'status':
            runStatus(ctx);
            return;
        case 'logout':
            runLogout(ctx);
            return;
        case '--help':
        case '-h':
        case 'help':
            printHelp();
            return;
        default:
            throw new Error(`Unknown command: ${command}`);
    }
}

async function main() {
    try {
        loadDotenv({ path: '.env.local' });
        await runCli({
            argv: process.argv.slice(2),
            env: process.env,
            cwd: process.cwd(),
        });
        process.exit(0);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('Fatal error:', message);
        process.exit(1);
    }
}

export { main as cli };

if (require.main === module) {
    main();
}
