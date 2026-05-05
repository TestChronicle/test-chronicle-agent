export interface ParameterData {
    count: number;
    hasParameters: boolean;
}
/**
 * Extracts parameterized test data from a Playwright/Vitest test.each() call.
 * Looks for: test.each([...]) or describe.each([...])
 *
 * Returns the number of parameter sets found (by counting {...} objects or [...] arrays).
 */
export declare function extractParameterizedDataFromEach(content: string): ParameterData | null;
/**
 * Extracts parameterized test data from a Cypress forEach().each() pattern.
 * Handles dynamic forEach loops where tests are generated in a loop.
 *
 * Example:
 * users.forEach(user => {
 *   it(`should greet ${user.name}`, () => { ... })
 * })
 *
 * @param testIndex - The character index of the it()/test() call in `content`,
 *   as returned by the regex match. Using the exact position avoids false
 *   positives from indexOf() finding an earlier occurrence of the test name.
 */
export declare function extractParameterizedDataFromForEach(content: string, testIndex: number): ParameterData | null;
/**
 * Detects whether a test at `testIndex` is wrapped inside a parameterized loop.
 * Scans backward up to 1000 characters looking for:
 * - for...of loops:     for (const x of items) {
 * - for...in loops:     for (const x in items) {
 * - forEach calls:      items.forEach(x => {
 *
 * This catches cases where the loop variable (and therefore the array) is
 * defined externally — i.e. where static count extraction is impossible.
 */
export declare function detectParameterizedLoop(content: string, testIndex: number): boolean;
/**
 * Determines if a test name likely comes from a parameterized test.
 * Looks for patterns like:
 * - "test name $variable" (Playwright each syntax)
 * - "test name ${expression}" (Template literal)
 * - Loop variables in the name
 */
export declare function isLikelyParameterizedTest(testName: string): boolean;
/**
 * Generates a display name for a parameterized test instance.
 * E.g., "should validate email" with 5 params becomes "should validate email [1/5]"
 */
export declare function generateParameterizedTestName(baseName: string, paramIndex: number, paramCount: number): string;
//# sourceMappingURL=parameterized.d.ts.map