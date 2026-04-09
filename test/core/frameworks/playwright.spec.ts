import { describe, it, expect } from 'vitest';
import { parsePlaywrightSpec } from '../../../src/core/frameworks/playwright';

const ROOT = '/project';
const FILE = '/project/tests/login.spec.ts';

describe('Playwright parser — basic extraction', () => {
    it('extracts a top-level test with no describe', () => {
        const content = `test('should load homepage', async ({ page }) => {})`;
        const spec = parsePlaywrightSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('should load homepage');
        expect(spec.tests[0].fullName).toBe('should load homepage');
        expect(spec.tests[0].describe).toBeUndefined();
    });

    it('uses > separator for tests inside a describe block', () => {
        const content = `
test.describe('Authentication', () => {
    test('logs in successfully', async ({ page }) => {})
})`;
        const spec = parsePlaywrightSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].fullName).toBe('Authentication > logs in successfully');
        expect(spec.tests[0].describe).toBe('Authentication');
    });

    it('uses the innermost describe for nested describes', () => {
        const content = `
test.describe('Outer', () => {
    test.describe('Inner', () => {
        test('deep test', async ({ page }) => {})
    })
})`;
        const spec = parsePlaywrightSpec(FILE, content, ROOT);
        expect(spec.tests[0].fullName).toBe('Inner > deep test');
    });
});

describe('Playwright parser — modifiers', () => {
    it('detects test.skip', () => {
        const content = `test.skip('pending test', async ({ page }) => {})`;
        const spec = parsePlaywrightSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('pending test');
    });

    it('detects test.only', () => {
        const content = `test.only('focused test', async ({ page }) => {})`;
        const spec = parsePlaywrightSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('focused test');
    });

    it('detects test.fixme', () => {
        const content = `test.fixme('broken test', async ({ page }) => {})`;
        const spec = parsePlaywrightSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('broken test');
    });
});

describe('Playwright parser — inline tags', () => {
    it('extracts a single inline tag', () => {
        const content = `test('smoke test', { tag: '@smoke' }, async ({ page }) => {})`;
        const spec = parsePlaywrightSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: '@smoke' }]);
    });

    it('extracts an array of inline tags', () => {
        const content = `test('critical test', { tag: ['@smoke', '@critical'] }, async ({ page }) => {})`;
        const spec = parsePlaywrightSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toHaveLength(2);
        expect(spec.tests[0].tags.map((t) => t.name)).toEqual(['@smoke', '@critical']);
    });

    it('returns empty tags when no inline tag is present', () => {
        const content = `test('plain test', async ({ page }) => {})`;
        const spec = parsePlaywrightSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toEqual([]);
    });
});
