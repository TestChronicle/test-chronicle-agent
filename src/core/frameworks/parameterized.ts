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
 */
export function extractParameterizedDataFromForEach(content: string, testName: string): ParameterData | null {
    // Look for forEach pattern near the test
    // This is more heuristic-based since we can't know the actual array size at static analysis time
    // We'll look for array declarations near the test

    // Find forEach(...) patterns that come before this test
    const contextStart = Math.max(0, content.lastIndexOf('\n', content.indexOf(testName)) - 1000);
    const contextEnd = content.indexOf(testName);
    const context = content.substring(contextStart, contextEnd);

    // Match patterns like: .forEach(x => or .forEach((x) => or FOR patterns
    const forEachMatch = context.match(/\b(?:users|items|data|elements|nodes)\.forEach\s*\(/i);
    const forMatch = context.match(/\bfor\s*\(\s*(?:let|var|const)\s+(\w+)\s+(?:of|in)\s+(.+?)\s*\)/);

    // If we found forEach or for-of, try to find the array declaration
    if (forEachMatch || forMatch) {
        // Look for array declarations: const arr = [...] or let x = [...]
        const arrayDeclMatch = context.match(/(?:const|let|var)\s+\w+\s*=\s*\[([\s\S]*?)\]/);

        if (arrayDeclMatch) {
            const arrayContent = arrayDeclMatch[1];
            const count = countParameterSets(arrayContent);
            if (count > 0) {
                return {
                    count,
                    hasParameters: true,
                };
            }
        }

        // If we found forEach but couldn't count, mark as unknown (heuristic)
        return {
            count: 0, // Unknown
            hasParameters: true,
        };
    }

    return null;
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
