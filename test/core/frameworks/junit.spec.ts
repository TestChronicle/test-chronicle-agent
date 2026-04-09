import { describe, it, expect } from 'vitest';
import { parseJUnitSpec } from '../../../src/core/frameworks/junit';
import { JUNIT } from '../../fixtures';

const ROOT = '/project';
const FILE = '/project/src/test/LoginTest.java';

describe('JUnit parser — basic extraction', () => {
    it('extracts @Test method names', () => {
        const spec = parseJUnitSpec(FILE, JUNIT.singleTest, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('shouldLoginSuccessfully');
    });

    it('uses the class name as the describe group in fullName', () => {
        const spec = parseJUnitSpec(FILE, JUNIT.singleTestAlt, ROOT);
        expect(spec.tests[0].fullName).toBe('LoginTest > shouldShowError');
        expect(spec.tests[0].describe).toBe('LoginTest');
    });

    it('extracts multiple tests from the same class', () => {
        const spec = parseJUnitSpec(FILE, JUNIT.multipleTests, ROOT);
        expect(spec.tests).toHaveLength(2);
        expect(spec.tests.map((t) => t.name)).toEqual(['loginTest', 'logoutTest']);
    });
});

describe('JUnit parser — @Ignore', () => {
    it('excludes tests annotated with @Ignore', () => {
        const spec = parseJUnitSpec(FILE, JUNIT.withIgnore, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('activeTest');
    });
});

describe('JUnit parser — @Tag', () => {
    it('maps @Tag annotation (before @Test) to tags', () => {
        const spec = parseJUnitSpec(FILE, JUNIT.withTag, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: 'smoke' }]);
    });
});
