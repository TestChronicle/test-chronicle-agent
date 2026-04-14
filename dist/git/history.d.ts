import { Framework, HistoryBuildResult } from '../types';
/**
 * Returns the hash of the most recent commit, or null if no history exists.
 */
export declare function getLatestCommitHash(projectPath: string): Promise<string | null>;
/**
 * Normalises a git remote URL to a clean HTTPS URL without a trailing `.git`.
 * Supports SSH (`git@github.com:owner/repo.git`) and HTTPS forms.
 * Returns null when the URL cannot be parsed or belongs to an unrecognised host.
 */
export declare function normaliseRemoteUrl(raw: string): string | null;
/**
 * Attempts to read the `origin` remote URL from the git repository at
 * `projectPath` and returns a normalised HTTPS URL.
 * Returns null if the remote cannot be found or the URL is unrecognised.
 */
export declare function getRepoUrl(projectPath: string): Promise<string | null>;
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