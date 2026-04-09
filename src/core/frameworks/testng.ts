import path from 'path';
import { TestCase, SpecFile } from '../../types';
import { hashId, lineNumberAt } from './common';

const TEST_METHOD_RE = /@Test\s*(?:\([^)]*\))?\s+(?:public\s+)?(?:void|[\w<>]+)\s+(\w+)\s*\(/gm;

const CLASS_DECLARATION_RE = /(?:public\s+)?class\s+(\w+)/;

const ENABLED_RE = /enabled\s*=\s*(false|true)/;

const GROUPS_RE = /groups\s*=\s*\{\s*"?([^}\"]+)"?\s*\}/;

// ─── Public API ───────────────────────────────────────────────────────────────

export function parseTestNGSpec(filePath: string, content: string, projectRoot: string): SpecFile {
    const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
    const className = extractClassName(content);
    const tests: TestCase[] = [];

    // Find all @Test annotations and their associated methods
    let match: RegExpExecArray | null;
    TEST_METHOD_RE.lastIndex = 0;

    while ((match = TEST_METHOD_RE.exec(content)) !== null) {
        const testName = match[1];
        const matchIndex = match.index;
        const line = lineNumberAt(content, matchIndex);

        // match[0] contains the full @Test(...) annotation and method signature
        const annotationText = match[0];
        const tags = extractTestNGTags(annotationText);
        const isEnabled = isTestEnabled(annotationText);

        // Don't include disabled tests (they're skipped)
        if (!isEnabled) {
            continue;
        }

        const id = hashId(`${relativePath}::${className}::${testName}`);

        tests.push({
            id,
            name: testName,
            fullName: className ? `${className} > ${testName}` : testName,
            describe: className,
            tags,
            line,
        });
    }

    return {
        id: hashId(relativePath),
        path: relativePath,
        name: path.basename(filePath),
        framework: 'testng',
        tests,
        testCount: tests.length,
        lastModified: new Date().toISOString(),
    };
}

/** Extracts only the test names from content without building a full SpecFile. */
export function extractTestNames(content: string): string[] {
    const className = extractClassName(content);
    const names: string[] = [];

    let match: RegExpExecArray | null;
    TEST_METHOD_RE.lastIndex = 0;

    while ((match = TEST_METHOD_RE.exec(content)) !== null) {
        const testName = match[1];

        // Check if test is enabled
        if (!isTestEnabled(match[0])) {
            continue;
        }

        names.push(className ? `${className} > ${testName}` : testName);
    }

    return names;
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Extract the class name from Java source code
 */
function extractClassName(content: string): string | undefined {
    const match = CLASS_DECLARATION_RE.exec(content);
    return match ? match[1] : undefined;
}

/**
 * Check if a test is enabled (default: true)
 */
function isTestEnabled(annotationText: string): boolean {
    const match = ENABLED_RE.exec(annotationText);
    if (match) {
        return match[1] === 'true';
    }
    return true; // default is enabled
}

/**
 * Extract TestNG group tags from annotation text
 */
function extractTestNGTags(annotationText: string): Array<{ name: string }> {
    const tags: Array<{ name: string }> = [];

    const groupMatch = GROUPS_RE.exec(annotationText);
    if (groupMatch) {
        const groups = groupMatch[1]
            .split(',')
            .map((g) => g.trim().replace(/^"|"$/g, ''))
            .filter((g) => g.length > 0);

        groups.forEach((g) => {
            tags.push({ name: g });
        });
    }

    return tags;
}
