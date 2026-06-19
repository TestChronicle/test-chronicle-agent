import { DetectionResult } from '../types';
/**
 * Detects all test frameworks present in the project.
 * Returns one DetectionResult per framework found, ordered by confidence.
 * Falls back to a single unknown result if nothing is detected.
 */
export declare function detectFrameworks(projectPath: string): DetectionResult[];
//# sourceMappingURL=detector.d.ts.map