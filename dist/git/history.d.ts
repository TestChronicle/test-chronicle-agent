import { Framework, HistoryBuildResult, DetectionResult } from '../types';
/**
 * Returns the hash of the most recent commit, or null if no history exists.
 */
export declare function getLatestCommitHash(projectPath: string): Promise<string | null>;
/**
 * Returns the commit hash at the tip of `origin/<branch>`, or null if the
 * remote ref cannot be resolved (e.g. no remote configured).
 */
export declare function getRemoteBranchTip(projectPath: string, branch: string): Promise<string | null>;
/**
 * Returns the currently checked-out branch, or null when the repository is in
 * detached HEAD state or the branch cannot be resolved.
 */
export declare function getCurrentBranch(projectPath: string): Promise<string | null>;
/**
 * Returns whether `commit` exists locally and is reachable from
 * `origin/<branch>`.
 */
export declare function isCommitReachableFromBranch(projectPath: string, commit: string, branch: string): Promise<boolean>;
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
 * Resolves the name of the default remote branch (e.g. "main", "master").
 * First attempts to read `origin/HEAD` via `git symbolic-ref`; if that fails,
 * it probes whether `origin/main` or `origin/master` exist. Falls back to
 * "main" as a safe default.
 */
export declare function getDefaultBranch(projectPath: string): Promise<string>;
/**
 * Builds the full commit history across all configured framework test directories.
 * If `sinceCommit` is provided, only commits after that hash are returned.
 * If `fullHistory` is true, scans all commits reachable from the default branch.
 * Only commits reachable from `origin/<defaultBranch>` are ever included so
 * that unmerged feature-branch commits are not surfaced.
 *
 * Returns both the history entries and any errors encountered during processing.
 */
export declare function buildHistory(projectPath: string, frameworkConfigs: DetectionResult[], defaultBranch: string, sinceCommit?: string, fullHistory?: boolean, sinceDate?: Date): Promise<HistoryBuildResult>;
/**
 * Resolves the framework for a given file path by finding the most specific
 * (longest) matching testDir across all framework configs.
 * Returns null if the file does not belong to any configured test directory.
 */
export declare function resolveFrameworkForFile(filePath: string, frameworkConfigs: DetectionResult[]): Framework | null;
//# sourceMappingURL=history.d.ts.map