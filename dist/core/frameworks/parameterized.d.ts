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
 */
export declare function extractParameterizedDataFromForEach(content: string, testName: string): ParameterData | null;
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