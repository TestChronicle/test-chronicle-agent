export declare const DEFAULT_DASHBOARD_URL = "https://www.testchronicle.com";
export declare const PROJECT_CONFIG_FILE = "testchronicle.config.json";
export interface ProjectLinkConfig {
    projectId: string;
    dashboardUrl: string;
}
export interface ResolvedSyncCredentials extends ProjectLinkConfig {
    apiKey: string;
    source: 'env' | 'local';
    vercelProtectionBypass?: string;
}
export declare function projectConfigPath(projectDir?: string): string;
export declare function readProjectConfig(projectDir?: string): ProjectLinkConfig | null;
export declare function writeProjectConfig(config: ProjectLinkConfig, projectDir?: string): void;
export declare function resolveEnvCredentials(env: NodeJS.ProcessEnv): ResolvedSyncCredentials | null;
export declare function dashboardUrlFromEnv(env: NodeJS.ProcessEnv): string;
//# sourceMappingURL=config.d.ts.map