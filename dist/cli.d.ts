import { SyncOptions } from './sync';
interface CliContext {
    argv: string[];
    env: NodeJS.ProcessEnv;
    cwd: string;
}
export declare function resolveSyncCredentials(ctx: CliContext): Promise<SyncOptions & {
    source: 'env' | 'local';
}>;
export declare function runCli(ctx: CliContext): Promise<void>;
declare function main(): Promise<void>;
export { main as cli };
//# sourceMappingURL=cli.d.ts.map