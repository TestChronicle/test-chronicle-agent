import { describe, it, expect } from 'vitest';
import { parseJUnitSpec } from '../../../src/core/frameworks/junit';

const ROOT = '/project';
const FILE = '/project/src/test/LoginTest.java';

describe('JUnit parser — basic extraction', () => {
    it('extracts @Test method names', () => {
        const content = `
        public class LoginTest {
            @Test
            public void shouldLoginSuccessfully() {}
        }`;
        const spec = parseJUnitSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('shouldLoginSuccessfully');
    });

    it('uses the class name as the describe group in fullName', () => {
        const content = `
        public class LoginTest {
            @Test
            public void shouldShowError() {}
        }`;
        const spec = parseJUnitSpec(FILE, content, ROOT);
        expect(spec.tests[0].fullName).toBe('LoginTest > shouldShowError');
        expect(spec.tests[0].describe).toBe('LoginTest');
    });

    it('extracts multiple tests from the same class', () => {
        const content = `
        public class AuthTest {
            @Test
            public void loginTest() {}

            @Test
            public void logoutTest() {}
        }`;
        const spec = parseJUnitSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(2);
        expect(spec.tests.map((t) => t.name)).toEqual(['loginTest', 'logoutTest']);
    });
});

describe('JUnit parser — @Ignore', () => {
    it('excludes tests annotated with @Ignore', () => {
        const content = `
        public class LoginTest {
            @Ignore
            @Test
            public void skippedTest() {}

            @Test
            public void activeTest() {}
        }`;
        const spec = parseJUnitSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('activeTest');
    });
});

describe('JUnit parser — @Tag', () => {
    it('maps @Tag annotation (before @Test) to tags', () => {
        const content = `
        public class LoginTest {
            @Tag("smoke")
            @Test
            public void smokeTest() {}
        }`;
        const spec = parseJUnitSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: 'smoke' }]);
    });
});
