/**
 * Parser fixture strings used by the unit test suite.
 *
 * Kept in a non-spec file so the Test Chronicle Agent does not parse
 * them as real test cases when syncing this repo's own tests.
 */

// ─── Playwright fixtures ──────────────────────────────────────────────────────

export const PLAYWRIGHT = {
    topLevel: `test('should load homepage', async ({ page }) => {})`,

    withDescribe: [
        `test.describe('Authentication', () => {`,
        `    test('logs in successfully', async ({ page }) => {})`,
        `})`,
    ].join('\n'),

    nestedDescribes: [
        `test.describe('Outer', () => {`,
        `    test.describe('Inner', () => {`,
        `        test('deep test', async ({ page }) => {})`,
        `    })`,
        `})`,
    ].join('\n'),

    skip: `test.skip('pending test', async ({ page }) => {})`,
    only: `test.only('focused test', async ({ page }) => {})`,
    fixme: `test.fixme('broken test', async ({ page }) => {})`,

    singleTag: `test('smoke test', { tag: '@smoke' }, async ({ page }) => {})`,
    arrayTags: `test('critical test', { tag: ['@smoke', '@critical'] }, async ({ page }) => {})`,
    noTags: `test('plain test', async ({ page }) => {})`,
};

// ─── Vitest fixtures ──────────────────────────────────────────────────────────

export const VITEST = {
    testCall: `test('should return true', () => {})`,
    itCall: `it('should return false', () => {})`,

    withDescribe: [`describe('UserService', () => {`, `    it('creates a user', () => {})`, `})`].join('\n'),

    standalone: `test('standalone', () => {})`,
    skip: `test.skip('pending', () => {})`,
    only: `test.only('focused', () => {})`,
    todo: `test.todo('not yet implemented')`,
    normal: `test('normal test', () => {})`,
};

// ─── Cypress fixtures ─────────────────────────────────────────────────────────

export const CYPRESS = {
    itCall: `it('should display the form', () => {})`,
    specifyCall: `specify('logs in with valid credentials', () => {})`,
    testCall: `test('submits the form', () => {})`,

    withDescribe: [
        `describe('Login page', () => {`,
        `    it('shows an error for invalid credentials', () => {})`,
        `})`,
    ].join('\n'),

    skip: `it.skip('skipped test', () => {})`,
    only: `it.only('focused test', () => {})`,
    plain: `it('plain test', () => {})`,
};

// ─── Parser dispatch fixtures ─────────────────────────────────────────────────

export const PARSER = {
    playwright: [
        `test.describe('Suite', () => {`,
        `    test('loads the page', async () => {})`,
        `    test('submits the form', async () => {})`,
        `})`,
    ].join('\n'),

    vitest: [
        `describe('Math', () => {`,
        `    it('adds numbers', () => {})`,
        `    test('subtracts numbers', () => {})`,
        `})`,
    ].join('\n'),

    cypress: [
        `describe('Login', () => {`,
        `    it('shows the form', () => {})`,
        `    specify('accepts valid credentials', () => {})`,
        `})`,
    ].join('\n'),

    testng: [`public class LoginTest {`, `    @Test`, `    public void shouldLogin() {}`, `}`].join('\n'),

    junit: [`public class AuthTest {`, `    @Test`, `    public void verifyLogin() {}`, `}`].join('\n'),

    lineNumbers: [`test('first', () => {})`, `test('second', () => {})`, `test('third', () => {})`].join('\n'),

    lineNumbersDeep: [
        ``,
        `// some comment`,
        ``,
        `test.describe('Suite', () => {`,
        `    test('deep test', async () => {})`,
        `})`,
    ].join('\n'),
};

// ─── SpecFile contract fixtures ───────────────────────────────────────────────

export const SPEC_FILE = {
    playwright: [
        `test.describe('Auth', () => {`,
        `    test('should login', async () => {})`,
        `    test('should logout', async () => {})`,
        `})`,
    ].join('\n'),

    vitest: [`describe('Math', () => {`, `    it('adds', () => {})`, `    it('subtracts', () => {})`, `})`].join('\n'),

    cypress: [`describe('Home', () => {`, `    it('loads', () => {})`, `    specify('has title', () => {})`, `})`].join(
        '\n',
    ),

    testng: [
        `public class HomeTest {`,
        `    @Test`,
        `    public void loadsPage() {}`,
        `    @Test`,
        `    public void hasTitle() {}`,
        `}`,
    ].join('\n'),

    junit: [
        `public class HomeTest {`,
        `    @Test`,
        `    public void loadsPage() {}`,
        `    @Test`,
        `    public void hasTitle() {}`,
        `}`,
    ].join('\n'),
};

// ─── TestNG fixtures ──────────────────────────────────────────────────────────

export const TESTNG = {
    singleTest: [
        `public class LoginTest {`,
        `    @Test`,
        `    public void shouldLoginWithValidCredentials() {}`,
        `}`,
    ].join('\n'),

    singleTestAlt: [`public class LoginTest {`, `    @Test`, `    public void shouldShowError() {}`, `}`].join('\n'),

    multipleTests: [
        `public class AuthTest {`,
        `    @Test`,
        `    public void loginTest() {}`,
        ``,
        `    @Test`,
        `    public void logoutTest() {}`,
        `}`,
    ].join('\n'),

    enabledFalse: [
        `public class LoginTest {`,
        `    @Test(enabled = false)`,
        `    public void skippedTest() {}`,
        ``,
        `    @Test`,
        `    public void activeTest() {}`,
        `}`,
    ].join('\n'),

    withGroups: [
        `public class LoginTest {`,
        `    @Test(groups = {"smoke"})`,
        `    public void smokeTest() {}`,
        `}`,
    ].join('\n'),
};

// ─── JUnit fixtures ───────────────────────────────────────────────────────────

export const JUNIT = {
    singleTest: [`public class LoginTest {`, `    @Test`, `    public void shouldLoginSuccessfully() {}`, `}`].join(
        '\n',
    ),

    singleTestAlt: [`public class LoginTest {`, `    @Test`, `    public void shouldShowError() {}`, `}`].join('\n'),

    multipleTests: [
        `public class AuthTest {`,
        `    @Test`,
        `    public void loginTest() {}`,
        ``,
        `    @Test`,
        `    public void logoutTest() {}`,
        `}`,
    ].join('\n'),

    withIgnore: [
        `public class LoginTest {`,
        `    @Ignore`,
        `    @Test`,
        `    public void skippedTest() {}`,
        ``,
        `    @Test`,
        `    public void activeTest() {}`,
        `}`,
    ].join('\n'),

    withTag: [`public class LoginTest {`, `    @Tag("smoke")`, `    @Test`, `    public void smokeTest() {}`, `}`].join(
        '\n',
    ),
};

// ─── Common/utility fixtures ──────────────────────────────────────────────────

export const COMMON = {
    lineNumberAt: 'line one\nline two\nline three',

    simpleBrace: '{ hello }',
    nestedBrace: '{ outer { inner } end }',
    unclosedBrace: '{ unclosed',
    prefixBrace: 'prefix { block }',

    describeWithTest: `test.describe('Login', () => {\n  test('logs in', () => {})\n})`,
    twoDescribes: [
        `test.describe('Suite A', () => { test('a1', () => {}) })`,
        `test.describe('Suite B', () => { test('b1', () => {}) })`,
    ].join('\n'),
    noDescribe: `test('solo', () => {})`,

    nestedDescribes: `test.describe('Outer', () => {\n  test.describe('Inner', () => {\n    test('deep', () => {})\n  })\n})`,
    outerAndTopLevel: `test.describe('Suite', () => { test('inside', () => {}) })\ntest('outside', () => {})`,
};

// ─── Parameterized fixtures ───────────────────────────────────────────────────

export const PARAMETERIZED = {
    each2items: [
        `test.each([`,
        `    { user: 'alice', role: 'admin' },`,
        `    { user: 'bob',   role: 'viewer' },`,
        `])('should display role for $user', ({ user, role }) => {})`,
    ].join('\n'),

    each3items: [
        `test.each([`,
        `    { id: 1, name: 'alpha' },`,
        `    { id: 2, name: 'beta' },`,
        `    { id: 3, name: 'gamma' },`,
        `])('loads item $name', ({ name }) => {})`,
    ].join('\n'),

    plain: `test('plain test', () => {})`,
};
