import { SpecFile } from '../../types';
import { IFrameworkParser } from '../base';
export declare function parseJestSpec(filePath: string, content: string, projectRoot: string): SpecFile;
export declare function extractTestNames(content: string): string[];
export declare const jestParser: IFrameworkParser;
//# sourceMappingURL=jest.d.ts.map