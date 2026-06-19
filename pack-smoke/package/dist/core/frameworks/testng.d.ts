import { SpecFile } from '../../types';
import { IFrameworkParser } from '../base';
export declare function parseTestNGSpec(filePath: string, content: string, projectRoot: string): SpecFile;
/** Extracts only the test names from content without building a full SpecFile. */
export declare function extractTestNames(content: string): string[];
export declare const testngParser: IFrameworkParser;
//# sourceMappingURL=testng.d.ts.map