import { Framework, HistoryBuildResult } from '../types';
/**
 * Returns the hash of the most recent commit, or null if no history exists.
 */
export declare function getLatestCommitHash(projectPath: string): Promise<string | null>;
/**
 * Builds the full commit history for the given test directory.
 * If `sinceCommit` is provided, only commits after that hash are returned.
 */
/**
 * Builds the full commit history for the given test directory.
 * If `sinceCommit` is provided, only commits after that hash are returned.
 * If `fullHistory` is true, scans all commits in the repo (for projects that moved tests).
 *
 * Returns both the history entries and any errors encountered during processing.
 */
export declare function buildHistory(projectPath: string, testDir: string, framework: Framework, sinceCommit?: string, fullHistory?: boolean): Promise<HistoryBuildResult>;
//# sourceMappingURL=history.d.ts.map