import { Framework, HistoryBuildResult, DetectionResult } from '../types';
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
 * Builds the full commit history across all configured framework test directories.
 * If `sinceCommit` is provided, only commits after that hash are returned.
 * If `fullHistory` is true, scans all commits in the repo (for projects that moved tests).
 *
 * Returns both the history entries and any errors encountered during processing.
 */
export declare function buildHistory(projectPath: string, frameworkConfigs: DetectionResult[], sinceCommit?: string, fullHistory?: boolean, sinceDate?: Date): Promise<HistoryBuildResult>;
/**
 * Resolves the framework for a given file path by finding the most specific
 * (longest) matching testDir across all framework configs.
 * Returns null if the file does not belong to any configured test directory.
 */
export declare function resolveFrameworkForFile(filePath: string, frameworkConfigs: DetectionResult[]): Framework | null;
//# sourceMappingURL=history.d.ts.map