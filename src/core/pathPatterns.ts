import path from 'path';
import { minimatch } from 'minimatch';

const GLOB_MAGIC_RE = /[*?[\]{}()!+@]/;

export function normaliseRepoPath(input: string): string {
    const normalised = input.trim().replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
    return normalised || '.';
}

export function hasPathPatternMagic(input: string): boolean {
    return GLOB_MAGIC_RE.test(normaliseRepoPath(input));
}

export function patternToFileGlob(input: string): string {
    const pattern = normaliseRepoPath(input);
    return pattern === '.' ? '**' : `${pattern}/**`;
}

export function matchesDirectoryPattern(filePath: string, pattern: string): boolean {
    const normalisedFile = normaliseRepoPath(filePath);
    const normalisedPattern = normaliseRepoPath(pattern);

    if (normalisedPattern === '.') return true;

    if (hasPathPatternMagic(normalisedPattern)) {
        return minimatch(normalisedFile, patternToFileGlob(normalisedPattern), { dot: true });
    }

    const withSlash = normalisedPattern.endsWith('/') ? normalisedPattern : `${normalisedPattern}/`;
    return normalisedFile.startsWith(withSlash) || path.posix.dirname(normalisedFile) === normalisedPattern;
}

export function pathPatternSpecificity(pattern: string): number {
    return normaliseRepoPath(pattern).replace(/[*!?[\]{}()@+]/g, '').length;
}

export function pathPatternRoot(input: string): string | null {
    const pattern = normaliseRepoPath(input);
    if (pattern === '.') return '.';

    const parts = pattern.split('/');
    const staticParts: string[] = [];

    for (const part of parts) {
        if (GLOB_MAGIC_RE.test(part)) break;
        staticParts.push(part);
    }

    if (staticParts.length === 0) return null;
    return staticParts.join('/');
}
