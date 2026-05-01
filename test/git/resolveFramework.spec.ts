import { describe, it, expect } from 'vitest';
import { resolveFrameworkForFile } from '../../src/git/history';
import type { DetectionResult } from '../../src/types';

const CONFIGS: DetectionResult[] = [
    { framework: 'playwright', testDir: './e2e', confidence: 'high' },
    { framework: 'vitest', testDir: './src', confidence: 'high' },
    { framework: 'cypress', testDir: './cypress/e2e', confidence: 'high' },
];

describe('resolveFrameworkForFile', () => {
    it('routes each file to the correct framework by testDir', () => {
        expect(resolveFrameworkForFile('e2e/login.spec.ts', CONFIGS)).toBe('playwright');
        expect(resolveFrameworkForFile('src/math.spec.ts', CONFIGS)).toBe('vitest');
        expect(resolveFrameworkForFile('cypress/e2e/home.cy.ts', CONFIGS)).toBe('cypress');
    });

    it('returns null when the file is outside all configured testDirs', () => {
        expect(resolveFrameworkForFile('docs/readme.md', CONFIGS)).toBeNull();
        expect(resolveFrameworkForFile('dist/output.js', CONFIGS)).toBeNull();
    });

    it('picks the most specific (longest) testDir when paths overlap', () => {
        const overlapping: DetectionResult[] = [
            { framework: 'playwright', testDir: './tests', confidence: 'high' },
            { framework: 'vitest', testDir: './tests/unit', confidence: 'high' },
        ];
        expect(resolveFrameworkForFile('tests/unit/math.spec.ts', overlapping)).toBe('vitest');
        expect(resolveFrameworkForFile('tests/e2e/login.spec.ts', overlapping)).toBe('playwright');
    });

    it('does not match a testDir that is only a prefix of the directory name', () => {
        // 'testing/foo.spec.ts' must NOT match testDir './test'
        const configs: DetectionResult[] = [{ framework: 'playwright', testDir: './test', confidence: 'high' }];
        expect(resolveFrameworkForFile('testing/foo.spec.ts', configs)).toBeNull();
    });

    it('ignores unknown framework entries', () => {
        const configs: DetectionResult[] = [
            { framework: 'unknown', testDir: './tests', confidence: 'low' },
            { framework: 'playwright', testDir: './e2e', confidence: 'high' },
        ];
        expect(resolveFrameworkForFile('tests/foo.spec.ts', configs)).toBeNull();
        expect(resolveFrameworkForFile('e2e/login.spec.ts', configs)).toBe('playwright');
    });
});
