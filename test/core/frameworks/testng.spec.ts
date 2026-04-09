import { describe, it, expect } from 'vitest';
import { parseTestNGSpec } from '../../../src/core/frameworks/testng';
import { TESTNG } from '../../fixtures';

const ROOT = '/project';
const FILE = '/project/src/test/LoginTest.java';

describe('TestNG parser — basic extraction', () => {
    it('extracts @Test method names', () => {
        const spec = parseTestNGSpec(FILE, TESTNG.singleTest, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('shouldLoginWithValidCredentials');
    });

    it('uses the class name as the describe group in fullName', () => {
        const spec = parseTestNGSpec(FILE, TESTNG.singleTestAlt, ROOT);
        expect(spec.tests[0].fullName).toBe('LoginTest > shouldShowError');
        expect(spec.tests[0].describe).toBe('LoginTest');
    });

    it('extracts multiple tests from the same class', () => {
        const spec = parseTestNGSpec(FILE, TESTNG.multipleTests, ROOT);
        expect(spec.tests).toHaveLength(2);
        expect(spec.tests.map((t) => t.name)).toEqual(['loginTest', 'logoutTest']);
    });
});

describe('TestNG parser — enabled flag', () => {
    it('excludes tests annotated with enabled=false', () => {
        const spec = parseTestNGSpec(FILE, TESTNG.enabledFalse, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('activeTest');
    });
});

describe('TestNG parser — groups as tags', () => {
    it('maps groups annotation to tags', () => {
        const spec = parseTestNGSpec(FILE, TESTNG.withGroups, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: 'smoke' }]);
    });
});
