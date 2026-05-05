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
export function extractParameterizedDataFromEach(content: string): ParameterData | null {
    // Find test.each(...) or describe.each(...) pattern
    // Match: test.each( [ ... ] ) or describe.each( [ ... ] )
    const eachRegex = new RegExp(`(?:test|describe)\\.each\\s*\\(\\s*\\[([\\s\\S]*?)\\]\\s*\\)`, 'g');

    let match;
    while ((match = eachRegex.exec(content)) !== null) {
        const dataContent = match[1];
        const paramCount = countParameterSets(dataContent);

        if (paramCount > 0) {
            return {
                count: paramCount,
                hasParameters: true,
            };
        }
    }

    return null;
}

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
export function extractParameterizedDataFromForEach(content: string, testIndex: number): ParameterData | null {
    // Look at the 1 000 characters immediately before this test's it()/test() call.
    const contextStart = Math.max(0, testIndex - 1000);
    const context = content.substring(contextStart, testIndex);

    // Match patterns like: .forEach(x => or .forEach((x) => or for-of/for-in
    const forEachMatch = context.match(/\b(?:users|items|data|elements|nodes)\.forEach\s*\(/i);
    const forMatch = context.match(/\bfor\s*\(\s*(?:let|var|const)\s+(\w+)\s+(?:of|in)\s+(.+?)\s*\)/);

    if (!(forEachMatch || forMatch)) return null;

    // Guard: verify the loop is still open at the point of our test, i.e. it
    // genuinely wraps this it() call rather than belonging to a previous test's
    // body that happened to be within the 1 000-char window.
    // Strategy: find the loop's position in context and count net braces after
    // it. If net braces go negative, the loop was closed before our test.
    const loopSearchStart = forEachMatch
        ? context.search(/\b(?:users|items|data|elements|nodes)\.forEach\s*\(/i)
        : context.search(/\bfor\s*\(\s*(?:let|var|const)/);

    if (loopSearchStart === -1) return null;

    let netBraces = 0;
    for (let i = loopSearchStart; i < context.length; i++) {
        if (context[i] === '{') netBraces++;
        else if (context[i] === '}') netBraces--;
        if (netBraces < 0) return null; // loop was closed before our test
    }

    // The loop is open — now try to count its items from an inline array decl.
    const arrayDeclMatch = context.match(/(?:const|let|var)\s+\w+\s*=\s*\[([\s\S]*?)\]/);

    if (arrayDeclMatch) {
        const arrayContent = arrayDeclMatch[1];
        const count = countParameterSets(arrayContent);
        if (count > 0) {
            return { count, hasParameters: true };
        }
    }

    // Loop found but array size is dynamic/unknown
    return { count: 0, hasParameters: true };
}

/**
 * Counts the number of parameter sets in a data array.
 * Handles both object notation {...} and array notation [...].
 *
 * For arrays like:
 * [
 *   { name: 'test1', value: 1 },
 *   { name: 'test2', value: 2 },
 *   { name: 'test3', value: 3 },
 * ]
 *
 * This will return 3 (three {...} blocks).
 */
function countParameterSets(dataContent: string): number {
    let count = 0;
    let inString = false;
    let stringChar = '';
    let braceDepth = 0;
    let bracketDepth = 0;

    for (let i = 0; i < dataContent.length; i++) {
        const char = dataContent[i];
        const prevChar = i > 0 ? dataContent[i - 1] : '';

        // Track string state to avoid counting braces/brackets inside strings
        if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
            }
            continue;
        }

        if (inString) continue;

        // Count opening braces (start of parameter object)
        if (char === '{' && bracketDepth === 0) {
            braceDepth++;
        }
        // Count closing braces
        else if (char === '}' && bracketDepth === 0) {
            braceDepth--;
            // If we're closing a top-level brace, we've completed one parameter set
            if (braceDepth === 0) {
                count++;
            }
        }
        // Track brackets for array notations
        else if (char === '[') {
            bracketDepth++;
        } else if (char === ']') {
            bracketDepth--;
        }
    }

    return count;
}

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
export function detectParameterizedLoop(content: string, testIndex: number): boolean {
    const contextStart = Math.max(0, testIndex - 1000);
    const context = content.substring(contextStart, testIndex);

    // for...of / for...in wrapping the test
    if (/\bfor\s*\(\s*(?:const|let|var)\s+.+?\s+(?:of|in)\s+.+?\)/.test(context)) {
        return true;
    }

    // .forEach( wrapping the test
    if (/\.\s*forEach\s*\(/.test(context)) {
        return true;
    }

    return false;
}

/**
 * Determines if a test name likely comes from a parameterized test.
 * Looks for patterns like:
 * - "test name $variable" (Playwright each syntax)
 * - "test name ${expression}" (Template literal)
 * - Loop variables in the name
 */
export function isLikelyParameterizedTest(testName: string): boolean {
    // Check for template literal placeholders
    if (testName.includes('$')) {
        return true;
    }

    // Check for common parameterized patterns
    if (/\[\d+\]/.test(testName)) {
        return true; // [0], [1], etc.
    }

    // Check for parameterized markers
    if (/\s#\s*\d+/.test(testName) || /param\s*\d+/i.test(testName)) {
        return true;
    }

    return false;
}

/**
 * Generates a display name for a parameterized test instance.
 * E.g., "should validate email" with 5 params becomes "should validate email [1/5]"
 */
export function generateParameterizedTestName(baseName: string, paramIndex: number, paramCount: number): string {
    return `${baseName} [${paramIndex + 1}/${paramCount}]`;
}
