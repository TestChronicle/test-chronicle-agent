import { describe, it, expect } from 'vitest';
import { parsePlaywrightSpec } from '../../../src/core/frameworks/playwright';
import { PLAYWRIGHT } from '../../fixtures';

const ROOT = '/project';
const FILE = '/project/tests/login.spec.ts';

describe('Playwright parser — basic extraction', () => {
    it('extracts a top-level test with no describe', () => {
        const spec = parsePlaywrightSpec(FILE, PLAYWRIGHT.topLevel, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('should load homepage');
        expect(spec.tests[0].fullName).toBe('should load homepage');
        expect(spec.tests[0].describe).toBeUndefined();
    });

    it('uses > separator for tests inside a describe block', () => {
        const spec = parsePlaywrightSpec(FILE, PLAYWRIGHT.withDescribe, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].fullName).toBe('Authentication > logs in successfully');
        expect(spec.tests[0].describe).toBe('Authentication');
    });

    it('uses the innermost describe for nested describes', () => {
        const spec = parsePlaywrightSpec(FILE, PLAYWRIGHT.nestedDescribes, ROOT);
        expect(spec.tests[0].fullName).toBe('Inner > deep test');
    });
});

describe('Playwright parser — modifiers', () => {
    it('detects test.skip', () => {
        const spec = parsePlaywrightSpec(FILE, PLAYWRIGHT.skip, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('pending test');
    });

    it('detects test.only', () => {
        const spec = parsePlaywrightSpec(FILE, PLAYWRIGHT.only, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('focused test');
    });

    it('detects test.fixme', () => {
        const spec = parsePlaywrightSpec(FILE, PLAYWRIGHT.fixme, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('broken test');
    });
});

describe('Playwright parser — inline tags', () => {
    it('extracts a single inline tag', () => {
        const spec = parsePlaywrightSpec(FILE, PLAYWRIGHT.singleTag, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: '@smoke' }]);
    });

    it('extracts an array of inline tags', () => {
        const spec = parsePlaywrightSpec(FILE, PLAYWRIGHT.arrayTags, ROOT);
        expect(spec.tests[0].tags).toHaveLength(2);
        expect(spec.tests[0].tags.map((t) => t.name)).toEqual(['@smoke', '@critical']);
    });

    it('returns empty tags when no inline tag is present', () => {
        const spec = parsePlaywrightSpec(FILE, PLAYWRIGHT.noTags, ROOT);
        expect(spec.tests[0].tags).toEqual([]);
    });
});
