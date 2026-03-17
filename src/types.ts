// ─── Framework ───────────────────────────────────────────────────────────────

export type Framework = 'playwright' | 'cypress' | 'testng' | 'junit' | 'vitest' | 'unknown';

export type ChangeStatus = 'added' | 'removed' | 'modified' | 'unchanged';

// ─── Test structure ───────────────────────────────────────────────────────────

export interface TestTag {
    name: string;
}

export interface TestCase {
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

export interface SpecFile {
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

// ─── Project ─────────────────────────────────────────────────────────────────

export interface ProjectStats {
    totalSpecs: number;
    totalTests: number;
    /** Tag name → count */
    tags: Record<string, number>;
}

/** Optional per-project config file (test-chronicle.config.json) */
export interface ProjectConfig {
    name?: string;
    framework?: Framework;
    /** Path to the test directory, relative to the project root */
    testDir?: string;
    /** Glob patterns to include (relative to testDir) */
    include?: string[];
    /** Glob patterns to exclude (relative to testDir) */
    exclude?: string[];
}

export interface Project {
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
export interface RegisteredProject {
    id: string;
    name: string;
    path: string;
}

export interface GlobalConfig {
    projects: RegisteredProject[];
    server?: {
        port?: number;
    };
}

// ─── Git history ──────────────────────────────────────────────────────────────

export interface GitFileChange {
    path: string;
    status: 'added' | 'deleted' | 'modified' | 'renamed';
    /** Previous path, only present on renames */
    oldPath?: string;
}

export interface GitCommit {
    hash: string;
    shortHash: string;
    message: string;
    author: string;
    /** ISO date string */
    date: string;
    changes: GitFileChange[];
}

export interface TestChange {
    type: 'added' | 'removed' | 'modified';
    name: string;
    oldName?: string;
}

export interface SpecHistoryEntry {
    specPath: string;
    fileStatus: 'added' | 'deleted' | 'modified' | 'renamed';
    changes: TestChange[];
}

export interface CommitHistory {
    commit: GitCommit;
    specs: SpecHistoryEntry[];
}

export interface HistoryError {
    commit: string;
    file: string;
    reason: string;
    partial?: boolean;
}

export interface HistoryBuildResult {
    entries: CommitHistory[];
    errors: HistoryError[];
    warnings: string[];
}

/**
 * Project sync baseline record - saved on first sync.
 * Tracks the baseline for all future incremental syncs.
 */
export interface ProjectSyncRecord {
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

// ─── Framework detection ──────────────────────────────────────────────────────

export interface DetectionResult {
    framework: Framework;
    testDir: string;
    confidence: 'high' | 'medium' | 'low';
}
