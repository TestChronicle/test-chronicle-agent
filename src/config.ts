import fs from 'fs';
import path from 'path';

export const DEFAULT_DASHBOARD_URL = 'https://www.testchronicle.com';
export const PROJECT_CONFIG_FILE = 'testchronicle.config.json';

export interface ProjectLinkConfig {
    projectId: string;
    dashboardUrl: string;
}

export interface ResolvedSyncCredentials extends ProjectLinkConfig {
    apiKey: string;
    source: 'env' | 'local';
}

function normaliseDashboardUrl(value: string): string {
    return value.replace(/\/$/, '');
}

export function projectConfigPath(projectDir = process.cwd()): string {
    return path.join(projectDir, PROJECT_CONFIG_FILE);
}

export function readProjectConfig(projectDir = process.cwd()): ProjectLinkConfig | null {
    const configPath = projectConfigPath(projectDir);
    if (!fs.existsSync(configPath)) return null;

    const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8')) as Partial<ProjectLinkConfig>;
    if (!parsed.projectId || !parsed.dashboardUrl) {
        throw new Error(`${PROJECT_CONFIG_FILE} must include projectId and dashboardUrl`);
    }

    return {
        projectId: parsed.projectId,
        dashboardUrl: normaliseDashboardUrl(parsed.dashboardUrl),
    };
}

export function writeProjectConfig(config: ProjectLinkConfig, projectDir = process.cwd()): void {
    const payload: ProjectLinkConfig = {
        projectId: config.projectId,
        dashboardUrl: normaliseDashboardUrl(config.dashboardUrl),
    };
    fs.writeFileSync(projectConfigPath(projectDir), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

export function resolveEnvCredentials(env: NodeJS.ProcessEnv): ResolvedSyncCredentials | null {
    const projectId = env.PROJECT_ID;
    const apiKey = env.API_KEY;
    if (!projectId || !apiKey) return null;

    return {
        projectId,
        apiKey,
        dashboardUrl: normaliseDashboardUrl(env.CHRONICLE_DASHBOARD_URL || DEFAULT_DASHBOARD_URL),
        source: 'env',
    };
}

export function dashboardUrlFromEnv(env: NodeJS.ProcessEnv): string {
    return normaliseDashboardUrl(env.CHRONICLE_DASHBOARD_URL || DEFAULT_DASHBOARD_URL);
}
