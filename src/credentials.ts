import fs from 'fs';
import os from 'os';
import path from 'path';
import { ProjectLinkConfig, ResolvedSyncCredentials } from './config';

interface StoredCredential {
    dashboardUrl: string;
    projectId: string;
    token: string;
    createdAt: string;
}

interface CredentialStore {
    credentials: StoredCredential[];
}

function appConfigDir(): string {
    if (process.env.TESTCHRONICLE_CONFIG_HOME) return process.env.TESTCHRONICLE_CONFIG_HOME;
    if (process.platform === 'win32' && process.env.APPDATA) {
        return path.join(process.env.APPDATA, 'TestChronicle');
    }
    if (process.platform === 'darwin') {
        return path.join(os.homedir(), 'Library', 'Application Support', 'TestChronicle');
    }
    return path.join(process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'), 'testchronicle');
}

export function credentialsPath(): string {
    return path.join(appConfigDir(), 'credentials.json');
}

function emptyStore(): CredentialStore {
    return { credentials: [] };
}

function readStore(): CredentialStore {
    const filePath = credentialsPath();
    if (!fs.existsSync(filePath)) return emptyStore();
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8')) as Partial<CredentialStore>;
    return { credentials: Array.isArray(parsed.credentials) ? parsed.credentials : [] };
}

function writeStore(store: CredentialStore): void {
    const filePath = credentialsPath();
    fs.mkdirSync(path.dirname(filePath), { recursive: true, mode: 0o700 });
    fs.writeFileSync(filePath, `${JSON.stringify(store, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 });
    try {
        fs.chmodSync(filePath, 0o600);
    } catch {
        // chmod is best-effort on Windows.
    }
}

function credentialKey(config: ProjectLinkConfig): string {
    return `${config.dashboardUrl}|${config.projectId}`;
}

export function saveCredential(config: ProjectLinkConfig, token: string): void {
    const store = readStore();
    const key = credentialKey(config);
    const next: StoredCredential = {
        dashboardUrl: config.dashboardUrl,
        projectId: config.projectId,
        token,
        createdAt: new Date().toISOString(),
    };

    store.credentials = store.credentials.filter((credential) => credentialKey(credential) !== key);
    store.credentials.push(next);
    writeStore(store);
}

export function readCredential(config: ProjectLinkConfig): string | null {
    const store = readStore();
    return store.credentials.find((credential) => credentialKey(credential) === credentialKey(config))?.token ?? null;
}

export function removeCredential(config: ProjectLinkConfig): boolean {
    const store = readStore();
    const before = store.credentials.length;
    store.credentials = store.credentials.filter((credential) => credentialKey(credential) !== credentialKey(config));
    if (store.credentials.length === before) return false;
    writeStore(store);
    return true;
}

export function resolveLocalCredentials(config: ProjectLinkConfig): ResolvedSyncCredentials | null {
    const token = readCredential(config);
    if (!token) return null;
    return {
        ...config,
        apiKey: token,
        source: 'local',
    };
}
