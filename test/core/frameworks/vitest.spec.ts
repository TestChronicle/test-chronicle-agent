import { describe, it, expect } from 'vitest';
import { parseVitestSpec } from '../../../src/core/frameworks/vitest';
import { VITEST } from '../../fixtures';

const ROOT = '/project';
const FILE = '/project/src/auth.spec.ts';

describe('Vitest parser — basic extraction', () => {
    it('detects test() calls', () => {
        const spec = parseVitestSpec(FILE, VITEST.testCall, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('should return true');
    });

    it('detects it() calls', () => {
        const spec = parseVitestSpec(FILE, VITEST.itCall, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('should return false');
    });

    it('uses > separator for tests inside a describe block', () => {
        const spec = parseVitestSpec(FILE, VITEST.withDescribe, ROOT);
        expect(spec.tests[0].fullName).toBe('UserService > creates a user');
        expect(spec.tests[0].describe).toBe('UserService');
    });

    it('top-level tests have no describe property', () => {
        const spec = parseVitestSpec(FILE, VITEST.standalone, ROOT);
        expect(spec.tests[0].describe).toBeUndefined();
        expect(spec.tests[0].fullName).toBe('standalone');
    });
});

describe('Vitest parser — modifiers', () => {
    it('detects test.skip', () => {
        const spec = parseVitestSpec(FILE, VITEST.skip, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('pending');
    });

    it('detects test.only', () => {
        const spec = parseVitestSpec(FILE, VITEST.only, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('focused');
    });

    it('assigns @todo tag to test.todo tests', () => {
        const spec = parseVitestSpec(FILE, VITEST.todo, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].tags).toEqual([{ name: '@todo' }]);
    });

    it('non-todo tests have no tags', () => {
        const spec = parseVitestSpec(FILE, VITEST.normal, ROOT);
        expect(spec.tests[0].tags).toEqual([]);
    });
});
