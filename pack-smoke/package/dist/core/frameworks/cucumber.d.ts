import { SpecFile } from '../../types';
import { IFrameworkParser } from '../base';
export declare function parseCucumberSpec(filePath: string, content: string, projectRoot: string): SpecFile;
/** Lightweight extraction of test full names from Gherkin content. */
export declare function extractTestNames(content: string): string[];
export declare const cucumberParser: IFrameworkParser;
//# sourceMappingURL=cucumber.d.ts.map