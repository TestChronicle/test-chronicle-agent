import { SpecFile } from '../../types';
export declare function parseVitestSpec(filePath: string, content: string, projectRoot: string): SpecFile;
/** Extracts only the test names from content without building a full SpecFile. */
export declare function extractTestNames(content: string): string[];
//# sourceMappingURL=vitest.d.ts.map