export { cli } from './cli.js';

type Framework = 'playwright' | 'cypress' | 'testng' | 'junit' | 'vitest' | 'unknown';
type ChangeStatus = 'added' | 'removed' | 'modified' | 'unchanged';
interface TestTag {
    name: string;
}
interface TestCase {
    id: string;
    /** Raw test name as written in the spec file */
    name: string;
    /** Fully qualified name, e.g. "Bag > should display product information correctly" */
    fullName: string;
    /** Parent describe block name, if any */
    describe?: string;
    tags: TestTag[];
    line: number;
}
interface SpecFile {
    id: string;
    /** Path relative to the project root */
    path: string;
    /** Basename, e.g. "bag.spec.ts" */
    name: string;
    framework: Framework;
    tests: TestCase[];
    testCount: number;
    /** ISO date string */
    lastModified: string;
}
interface ProjectStats {
    totalSpecs: number;
    totalTests: number;
    /** Tag name → count */
    tags: Record<string, number>;
}
/** Optional per-project config file (test-chronicle.config.json) */
interface ProjectConfig {
    name?: string;
    framework?: Framework;
    /** Path to the test directory, relative to the project root */
    testDir?: string;
    /** Glob patterns to include (relative to testDir) */
    include?: string[];
    /** Glob patterns to exclude (relative to testDir) */
    exclude?: string[];
}
interface Project {
    id: string;
    name: string;
    path: string;
    framework: Framework;
    testDir: string;
    config?: ProjectConfig;
    /** ISO date string */
    lastSynced?: string;
}
/** Lightweight project reference stored in the global config */
interface RegisteredProject {
    id: string;
    name: string;
    path: string;
}
interface GlobalConfig {
    projects: RegisteredProject[];
    server?: {
        port?: number;
    };
}
interface GitFileChange {
    path: string;
    status: 'added' | 'deleted' | 'modified' | 'renamed';
    /** Previous path, only present on renames */
    oldPath?: string;
}
interface GitCommit {
    hash: string;
    shortHash: string;
    message: string;
    author: string;
    /** ISO date string */
    date: string;
    changes: GitFileChange[];
}
interface TestChange {
    type: 'added' | 'removed' | 'modified';
    name: string;
    oldName?: string;
}
interface SpecHistoryEntry {
    specPath: string;
    fileStatus: 'added' | 'deleted' | 'modified' | 'renamed';
    changes: TestChange[];
}
interface CommitHistory {
    commit: GitCommit;
    specs: SpecHistoryEntry[];
}
interface HistoryError {
    commit: string;
    file: string;
    reason: string;
    partial?: boolean;
}
interface HistoryBuildResult {
    entries: CommitHistory[];
    errors: HistoryError[];
    warnings: string[];
}
/**
 * Project sync baseline record - saved on first sync.
 * Tracks the baseline for all future incremental syncs.
 */
interface ProjectSyncRecord {
    projectId: string;
    /** ISO date string when first sync occurred */
    firstSyncDate: string;
    /** Git commit hash at time of first sync */
    firstSyncCommit: string;
    /** Baseline test statistics (current state at first sync) */
    baselineStats: {
        totalTests: number;
        totalFiles: number;
        tags: Record<string, number>;
    };
    /** Last synced commit hash (for next incremental sync) */
    lastSyncCommit: string;
    /** Framework detected at first sync (for consistency checks) */
    detectedFramework: Framework;
}
interface DetectionResult {
    framework: Framework;
    testDir: string;
    confidence: 'high' | 'medium' | 'low';
}

declare function detectFramework(projectPath: string): DetectionResult;

declare function parseSpecFile(filePath: string, content: string, projectRoot: string, framework: Framework): SpecFile;
/** Extract test names from raw file content without constructing a full SpecFile. */
declare function extractTestNamesFromContent(content: string, framework: Framework): string[];
/** Resolve all spec files under testDir for the given framework. */
declare function findSpecFiles(projectRoot: string, testDir: string, framework: Framework): string[];
/** Parse all spec files in a project directory. */
declare function parseAllSpecs(projectRoot: string, testDir: string, framework: Framework): SpecFile[];

declare const index$1_detectFramework: typeof detectFramework;
declare const index$1_extractTestNamesFromContent: typeof extractTestNamesFromContent;
declare const index$1_findSpecFiles: typeof findSpecFiles;
declare const index$1_parseAllSpecs: typeof parseAllSpecs;
declare const index$1_parseSpecFile: typeof parseSpecFile;
declare namespace index$1 {
  export { index$1_detectFramework as detectFramework, index$1_extractTestNamesFromContent as extractTestNamesFromContent, index$1_findSpecFiles as findSpecFiles, index$1_parseAllSpecs as parseAllSpecs, index$1_parseSpecFile as parseSpecFile };
}

/**
 * Returns the hash of the most recent commit, or null if no history exists.
 */
declare function getLatestCommitHash(projectPath: string): Promise<string | null>;
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
declare function buildHistory(projectPath: string, testDir: string, framework: Framework, sinceCommit?: string, fullHistory?: boolean): Promise<HistoryBuildResult>;

declare const index_buildHistory: typeof buildHistory;
declare const index_getLatestCommitHash: typeof getLatestCommitHash;
declare namespace index {
  export { index_buildHistory as buildHistory, index_getLatestCommitHash as getLatestCommitHash };
}

export { type ChangeStatus, type CommitHistory, index$1 as Core, type DetectionResult, type Framework, index as Git, type GitCommit, type GitFileChange, type GlobalConfig, type HistoryBuildResult, type HistoryError, type Project, type ProjectConfig, type ProjectStats, type ProjectSyncRecord, type RegisteredProject, type SpecFile, type SpecHistoryEntry, type TestCase, type TestChange, type TestTag, buildHistory, detectFramework, extractTestNamesFromContent, findSpecFiles, getLatestCommitHash, parseAllSpecs, parseSpecFile };
