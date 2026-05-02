import { SpecFile } from '../../types';
import { IFrameworkParser } from '../base';
export declare function parseJUnitSpec(filePath: string, content: string, projectRoot: string): SpecFile;
/** Extracts only the test names from content without building a full SpecFile. */
export declare function extractTestNames(content: string): string[];
export declare const junitParser: IFrameworkParser;
//# sourceMappingURL=junit.d.ts.map