import { SpecFile } from '../../types';
import { IFrameworkParser } from '../base';
export declare function parsePytestSpec(filePath: string, content: string, projectRoot: string): SpecFile;
export declare function extractTestNames(content: string): string[];
export declare const pytestParser: IFrameworkParser;
//# sourceMappingURL=pytest.d.ts.map