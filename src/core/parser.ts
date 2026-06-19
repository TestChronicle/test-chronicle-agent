import { readFileSync, statSync } from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { minimatch } from 'minimatch';
import { Framework, SpecFile, DetectionResult } from '../types';
import { IFrameworkParser, FrameworkParserRegistry } from './base';
import { playwrightParser } from './frameworks/playwright';
import { cypressParser } from './frameworks/cypress';
import { vitestParser } from './frameworks/vitest';
import { jestParser } from './frameworks/jest';
import { pytestParser } from './frameworks/pytest';
import { testngParser } from './frameworks/testng';
import { junitParser } from './frameworks/junit';
import { cucumberParser } from './frameworks/cucumber';

const PARSERS: Record<Exclude<Framework, 'unknown'>, IFrameworkParser> = {
    playwright: playwrightParser,
    cypress: cypressParser,
    vitest: vitestParser,
    jest: jestParser,
    pytest: pytestParser,
    testng: testngParser,
    junit: junitParser,
    cucumber: cucumberParser,
} satisfies FrameworkParserRegistry;

/** Returns the parser for a framework, or null for 'unknown'. */
function getParser(framework: Framework): IFrameworkParser | null {
    if (framework === 'unknown') return null;
    return PARSERS[framework];
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function parseSpecFile(filePath: string, content: string, projectRoot: string, framework: Framework): SpecFile {
    const parser = getParser(framework);
    if (!parser) throw new Error(`Cannot parse spec for unresolved framework 'unknown'`);

    const spec = parser.parseFile(filePath, content, projectRoot);

    // Stamp lastModified from the actual file, not parse time
    try {
        spec.lastModified = statSync(filePath).mtime.toISOString();
    } catch {
        // File may not exist if parsing historical content from git — keep default
    }

    return spec;
}

/** Extract test names from raw file content without constructing a full SpecFile. */
export function extractTestNamesFromContent(content: string, framework: Framework): string[] {
    return getParser(framework)?.extractTestNames(content) ?? [];
}

/** Extract test names with their line numbers from raw file content. */
export function extractTestsWithLinesFromContent(
    content: string,
    framework: Framework,
): { name: string; line: number }[] {
    const dummyPath = '/__git_history__/test.spec.ts';
    const dummyRoot = '/__git_history__';
    const parser = getParser(framework);
    if (!parser) return [];
    const spec = parser.parseFile(dummyPath, content, dummyRoot);
    return spec.tests.map((t) => ({ name: t.fullName, line: t.line }));
}

/** Resolve all spec files under testDir for the given framework. */
export function findSpecFiles(projectRoot: string, testDir: string, framework: Framework): string[] {
    const parser = getParser(framework);
    if (!parser) return [];

    const baseDir = path.resolve(projectRoot, testDir);

    return globSync(parser.filePatterns, {
        cwd: baseDir,
        absolute: true,
        nodir: true,
        ignore: ['**/node_modules/**'],
    });
}

/**
 * Returns true when `filePath` (relative or absolute) matches any of the
 * framework's declared `filePatterns`.  The basename of the file is tested
 * against each glob pattern so callers don't have to normalise paths.
 *
 * This is the single source of truth for "does this file belong to this
 * framework?" — both the live file-finder and the git-history pipeline use it
 * so adding a new framework to the parser registry automatically covers both.
 */
export function isFrameworkSpecFile(filePath: string, framework: Framework): boolean {
    const parser = getParser(framework);
    if (!parser) return false;
    // Test both the full (normalised) path and the basename so patterns like
    // '**/*.feature' or '**/*Test.java' resolve correctly regardless of whether
    // the caller passes an absolute or relative path.
    const normalised = filePath.replace(/\\/g, '/');
    return parser.filePatterns.some(
        (pattern) => minimatch(normalised, pattern) || minimatch(path.basename(normalised), pattern),
    );
}

/** Parse all spec files across multiple framework configs, deduplicating by file path. */
export function parseAllSpecs(projectRoot: string, frameworkConfigs: DetectionResult[]): SpecFile[] {
    const seen = new Set<string>();
    const allSpecs: SpecFile[] = [];

    // Sort configs so most-specific (longest) testDirs are processed first,
    // ensuring the best framework match wins when testDirs overlap.
    const sorted = [...frameworkConfigs].sort((a, b) => b.testDir.length - a.testDir.length);

    for (const { framework, testDir } of sorted) {
        if (framework === 'unknown') continue;
        const files = findSpecFiles(projectRoot, testDir, framework);
        for (const filePath of files) {
            try {
                if (!statSync(filePath).isFile()) continue;
            } catch {
                continue;
            }

            const normalized = path.normalize(filePath);
            if (seen.has(normalized)) continue;
            seen.add(normalized);
            const content = readFileSync(filePath, 'utf-8');
            allSpecs.push(parseSpecFile(filePath, content, projectRoot, framework));
        }
    }

    return allSpecs;
}
