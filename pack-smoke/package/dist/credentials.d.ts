import { ProjectLinkConfig, ResolvedSyncCredentials } from './config';
export declare function credentialsPath(): string;
export declare function saveCredential(config: ProjectLinkConfig, token: string): void;
export declare function readCredential(config: ProjectLinkConfig): string | null;
export declare function removeCredential(config: ProjectLinkConfig): boolean;
export declare function resolveLocalCredentials(config: ProjectLinkConfig, dashboardUrl?: string): ResolvedSyncCredentials | null;
//# sourceMappingURL=credentials.d.ts.map