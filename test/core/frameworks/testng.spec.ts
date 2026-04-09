import { describe, it, expect } from 'vitest';
import { parseTestNGSpec } from '../../../src/core/frameworks/testng';

const ROOT = '/project';
const FILE = '/project/src/test/LoginTest.java';

describe('TestNG parser — basic extraction', () => {
    it('extracts @Test method names', () => {
        const content = `
public class LoginTest {
    @Test
    public void shouldLoginWithValidCredentials() {}
}`;
        const spec = parseTestNGSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('shouldLoginWithValidCredentials');
    });

    it('uses the class name as the describe group in fullName', () => {
        const content = `
public class LoginTest {
    @Test
    public void shouldShowError() {}
}`;
        const spec = parseTestNGSpec(FILE, content, ROOT);
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
        const spec = parseTestNGSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(2);
        expect(spec.tests.map((t) => t.name)).toEqual(['loginTest', 'logoutTest']);
    });
});

describe('TestNG parser — enabled flag', () => {
    it('excludes tests annotated with enabled=false', () => {
        const content = `
public class LoginTest {
    @Test(enabled = false)
    public void skippedTest() {}

    @Test
    public void activeTest() {}
}`;
        const spec = parseTestNGSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('activeTest');
    });
});

describe('TestNG parser — groups as tags', () => {
    it('maps groups annotation to tags', () => {
        const content = `
public class LoginTest {
    @Test(groups = {"smoke"})
    public void smokeTest() {}
}`;
        const spec = parseTestNGSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: 'smoke' }]);
    });
});
