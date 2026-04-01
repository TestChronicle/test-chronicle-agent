import { Framework, SpecFile } from '../types';
export declare function parseSpecFile(filePath: string, content: string, projectRoot: string, framework: Framework): SpecFile;
/** Extract test names from raw file content without constructing a full SpecFile. */
export declare function extractTestNamesFromContent(content: string, framework: Framework): string[];
/** Resolve all spec files under testDir for the given framework. */
export declare function findSpecFiles(projectRoot: string, testDir: string, framework: Framework): string[];
/** Parse all spec files in a project directory. */
export declare function parseAllSpecs(projectRoot: string, testDir: string, framework: Framework): SpecFile[];
//# sourceMappingURL=parser.d.ts.map