import { describe, it, expect } from 'vitest';
import { parseVitestSpec } from '../../../src/core/frameworks/vitest';

const ROOT = '/project';
const FILE = '/project/src/auth.spec.ts';

describe('Vitest parser — basic extraction', () => {
    it('detects test() calls', () => {
        const content = `test('should return true', () => {})`;
        const spec = parseVitestSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('should return true');
    });

    it('detects it() calls', () => {
        const content = `it('should return false', () => {})`;
        const spec = parseVitestSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('should return false');
    });

    it('uses > separator for tests inside a describe block', () => {
        const content = `
        describe('UserService', () => {
            it('creates a user', () => {})
        })`;
        const spec = parseVitestSpec(FILE, content, ROOT);
        expect(spec.tests[0].fullName).toBe('UserService > creates a user');
        expect(spec.tests[0].describe).toBe('UserService');
    });

    it('top-level tests have no describe property', () => {
        const content = `test('standalone', () => {})`;
        const spec = parseVitestSpec(FILE, content, ROOT);
        expect(spec.tests[0].describe).toBeUndefined();
        expect(spec.tests[0].fullName).toBe('standalone');
    });
});

describe('Vitest parser — modifiers', () => {
    it('detects test.skip', () => {
        const content = `test.skip('pending', () => {})`;
        const spec = parseVitestSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('pending');
    });

    it('detects test.only', () => {
        const content = `test.only('focused', () => {})`;
        const spec = parseVitestSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('focused');
    });

    it('assigns @todo tag to test.todo tests', () => {
        const content = `test.todo('not yet implemented')`;
        const spec = parseVitestSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].tags).toEqual([{ name: '@todo' }]);
    });

    it('non-todo tests have no tags', () => {
        const content = `test('normal test', () => {})`;
        const spec = parseVitestSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toEqual([]);
    });
});
