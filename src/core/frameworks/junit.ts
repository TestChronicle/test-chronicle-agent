import path from 'path';
import { TestCase, SpecFile } from '../../types';
import { hashId, lineNumberAt } from './common';

const TEST_METHOD_RE = /@Test\s+(?:public\s+)?(?:void|[\w<>]+)\s+(\w+)\s*\(/gm;

const CLASS_DECLARATION_RE = /(?:public\s+)?class\s+(\w+)/;

const IGNORE_RE = /@Ignore/;

const TAG_RE = /@Tag\s*\(\s*"([^"]+)"\s*\)/g;

export function parseJUnitSpec(filePath: string, content: string, projectRoot: string): SpecFile {
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

        // Scope the annotation block to between the previous method's closing
        // brace and this @Test, to avoid bleeding across method boundaries.
        const prevBracePos = content.lastIndexOf('}', matchIndex - 1);
        const annotationBlockStart = prevBracePos !== -1 ? prevBracePos + 1 : 0;
        const annotationBlock = content.substring(annotationBlockStart, matchIndex);

        // Check if test is ignored
        if (IGNORE_RE.test(annotationBlock)) {
            continue; // Skip ignored tests
        }

        // Extract tags from @Tag annotations
        const tags = extractJUnitTags(annotationBlock);

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
        framework: 'junit',
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
        const matchIndex = match.index;

        // Scope the annotation block to between the previous closing brace and
        // this @Test to avoid bleeding across method boundaries.
        const prevBracePos2 = content.lastIndexOf('}', matchIndex - 1);
        const annotationBlockStart2 = prevBracePos2 !== -1 ? prevBracePos2 + 1 : 0;
        const annotationBlock2 = content.substring(annotationBlockStart2, matchIndex);
        if (IGNORE_RE.test(annotationBlock2)) {
            continue; // Skip ignored tests
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
 * Extract JUnit @Tag annotations (JUnit 5+).
 * Returns tags from @Tag("tagname") annotations.
 *
 * Example:
 * ```
 * @Test
 * @Tag("smoke")
 * @Tag("login")
 * public void shouldLogin() { ... }
 * ```
 *
 * Returns: [{ name: 'smoke' }, { name: 'login' }]
 */
function extractJUnitTags(annotationBlock: string): Array<{ name: string }> {
    const tags: Array<{ name: string }> = [];

    let tagMatch: RegExpExecArray | null;
    TAG_RE.lastIndex = 0;

    while ((tagMatch = TAG_RE.exec(annotationBlock)) !== null) {
        if (tagMatch[1]) {
            tags.push({ name: tagMatch[1] });
        }
    }

    return tags;
}
