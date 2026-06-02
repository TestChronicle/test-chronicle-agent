import { Framework, SpecFile, DetectionResult } from '../types';
export declare function parseSpecFile(filePath: string, content: string, projectRoot: string, framework: Framework): SpecFile;
/** Extract test names from raw file content without constructing a full SpecFile. */
export declare function extractTestNamesFromContent(content: string, framework: Framework): string[];
/** Extract test names with their line numbers from raw file content. */
export declare function extractTestsWithLinesFromContent(content: string, framework: Framework): {
    name: string;
    line: number;
}[];
/** Resolve all spec files under testDir for the given framework. */
export declare function findSpecFiles(projectRoot: string, testDir: string, framework: Framework): string[];
/**
 * Returns true when `filePath` (relative or absolute) matches any of the
 * framework's declared `filePatterns`.  The basename of the file is tested
 * against each glob pattern so callers don't have to normalise paths.
 *
 * This is the single source of truth for "does this file belong to this
 * framework?" — both the live file-finder and the git-history pipeline use it
 * so adding a new framework to the parser registry automatically covers both.
 */
export declare function isFrameworkSpecFile(filePath: string, framework: Framework): boolean;
/** Parse all spec files across multiple framework configs, deduplicating by file path. */
export declare function parseAllSpecs(projectRoot: string, frameworkConfigs: DetectionResult[]): SpecFile[];
//# sourceMappingURL=parser.d.ts.map