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

    // for..of loop INSIDE the test body — must NOT be tagged @parameterized.
    forLoopInsideBody: [
        `test('loops internally', async ({ page }) => {`,
        `    const items = ['a', 'b', 'c'];`,
        `    for (const item of items) {`,
        `        expect(item).toBeTruthy();`,
        `    }`,
        `});`,
        ``,
        `test('plain test after loop', async ({ page }) => {});`,
    ].join('\n'),
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

    // for..of loop INSIDE the test body — must NOT be tagged @parameterized.
    forLoopInsideBody: [
        `it('loops internally', () => {`,
        `    const items = ['a', 'b', 'c'];`,
        `    for (const item of items) {`,
        `        expect(item).toBeTruthy();`,
        `    }`,
        `});`,
        ``,
        `it('plain test after loop', () => {});`,
    ].join('\n'),
};

// ─── Cypress fixtures ─────────────────────────────────────────────────────────

export const JEST = {
    testCall: `test('returns true', () => {})`,
    withDescribe: [`describe('AuthService', () => {`, `    it('logs in', () => {})`, `})`].join('\n'),
    modifiers: [`test.concurrent('runs in parallel', () => {})`, `test.failing('known failure', () => {})`].join(
        '\n',
    ),
    todo: `test.todo('not implemented')`,
    each: [
        `test.each([`,
        `    [1, 2, 3],`,
        `    [2, 3, 5],`,
        `])('adds %i and %i', (a, b, expected) => {})`,
    ].join('\n'),
    describeEach: [
        `describe.each([{ role: 'admin' }])('role $role', ({ role }) => {`,
        `    test('can sign in', () => {})`,
        `})`,
    ].join('\n'),
};

export const PYTEST = {
    functionTest: [`def test_login():`, `    assert True`].join('\n'),
    classTest: [`class TestAuth:`, `    def test_login(self):`, `        assert True`].join('\n'),
    asyncTest: [`async def test_async_login():`, `    assert True`].join('\n'),
    markers: [`@pytest.mark.smoke`, `@pytest.mark.regression`, `def test_checkout():`, `    assert True`].join('\n'),
    parametrize: [`@pytest.mark.parametrize("value", [1, 2, 3])`, `def test_value(value):`, `    assert value`].join(
        '\n',
    ),
    multilineParametrize: [
        `@pytest.mark.parametrize(`,
        `    "value",`,
        `    [1, 2, 3],`,
        `)`,
        `def test_value(value):`,
        `    assert value`,
    ].join('\n'),
    lineNumber: [`import pytest`, ``, `@pytest.mark.smoke`, `def test_line_number():`, `    assert True`].join(
        '\n',
    ),
};

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

    jest: [
        `describe('Cart', () => {`,
        `    it('adds items', () => {})`,
        `    test('removes items', () => {})`,
        `})`,
    ].join('\n'),

    pytest: [
        `class TestCart:`,
        `    def test_adds_items(self):`,
        `        assert True`,
        `    def test_removes_items(self):`,
        `        assert True`,
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

export const PARSER_TEMP_FILES = {
    playwrightLogin: `test('logs in', async () => {})\n`,
    jestLogin: `test('renders login', () => {})\n`,
    vitestToken: `test('validates token', () => {})\n`,
};

export const SPEC_FILE = {
    playwright: [
        `test.describe('Auth', () => {`,
        `    test('should login', async () => {})`,
        `    test('should logout', async () => {})`,
        `})`,
    ].join('\n'),

    vitest: [`describe('Math', () => {`, `    it('adds', () => {})`, `    it('subtracts', () => {})`, `})`].join('\n'),

    jest: [`describe('Cart', () => {`, `    it('adds', () => {})`, `    test('removes', () => {})`, `})`].join('\n'),

    pytest: [
        `class TestCart:`,
        `    def test_adds(self):`,
        `        assert True`,
        `    def test_removes(self):`,
        `        assert True`,
    ].join('\n'),

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

    dataProvider: [
        `public class LoginTest {`,
        `    @Test(dataProvider = "users")`,
        `    public void shouldLogin(String user) {}`,
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

    parameterized: [
        `public class LoginTest {`,
        `    @ParameterizedTest`,
        `    @ValueSource(strings = {"admin", "guest"})`,
        `    public void canLoginAsRole(String role) {}`,
        `}`,
    ].join('\n'),
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

// ─── Cypress parameterized fixtures ──────────────────────────────────────────

export const CYPRESS_PARAMETERIZED = {
    // A test that wraps it() calls in a forEach — genuinely parameterized.
    forEach: [
        `const users = [`,
        `    { name: 'alice' },`,
        `    { name: 'bob' },`,
        `];`,
        `users.forEach((user) => {`,
        `    it('should greet ' + user.name, () => {})`,
        `});`,
    ].join('\n'),

    // A test that uses for..of INSIDE its body — NOT parameterized.
    // A second plain test follows to test that it is also not tagged.
    forLoopInsideBody: [
        `it('loops internally', () => {`,
        `    const items = ['a', 'b', 'c'];`,
        `    for (const item of items) {`,
        `        expect(item).toBeTruthy();`,
        `    }`,
        `});`,
        ``,
        `it('plain test after loop', () => {});`,
    ].join('\n'),
};

// ─── Cucumber / Gherkin fixtures ──────────────────────────────────────────────

export const CUCUMBER = {
    /** Single Feature + single Scenario — no tags */
    simpleScenario: [
        `Feature: Login`,
        `  As a user`,
        `  I want to log in`,
        ``,
        `  Scenario: Successful login`,
        `    Given I am on the login page`,
        `    When I enter valid credentials`,
        `    Then I should see the dashboard`,
    ].join('\n'),

    /** Feature-level tags should be inherited by the Scenario */
    withFeatureTags: [
        `@smoke @regression`,
        `Feature: Search`,
        ``,
        `  Scenario: Basic search`,
        `    Given I am on the search page`,
        `    When I search for "widget"`,
        `    Then I see results`,
    ].join('\n'),

    /** Scenario-level tags only (no feature tags) */
    withScenarioTags: [
        `Feature: Checkout`,
        ``,
        `  @smoke @critical`,
        `  Scenario: Complete purchase`,
        `    Given I have items in my basket`,
        `    When I complete checkout`,
        `    Then I receive a confirmation`,
    ].join('\n'),

    /** Feature tags AND Scenario tags — merged on the test */
    mixedTagInheritance: [
        `@feature-tag`,
        `Feature: Add to Bag`,
        ``,
        `  @scenario-tag @SEVERITY=Critical`,
        `  Scenario: Adding item to Bag`,
        `    Given the user is on a Product Display Page`,
        `    When adding this size to the Bag`,
        `    Then this product should appear in their Bag`,
    ].join('\n'),

    /** Scenario Outline with 3 data rows → 3 test cases */
    scenarioOutline: [
        `Feature: Form Validation`,
        ``,
        `  Scenario Outline: Validate email format`,
        `    Given I enter "<email>" in the email field`,
        `    Then I see the error "<error>"`,
        ``,
        `    Examples:`,
        `      | email            | error              |`,
        `      | invalid          | Invalid email      |`,
        `      | missing@         | Invalid email      |`,
        `      | valid@test.com   | No error           |`,
    ].join('\n'),

    /** Scenario Template (synonym for Scenario Outline) with 2 rows */
    scenarioTemplate: [
        `Feature: Pricing`,
        ``,
        `  Scenario Template: Check price`,
        `    Given the product is "<product>"`,
        `    Then the price is "<price>"`,
        ``,
        `    Examples:`,
        `      | product | price |`,
        `      | Widget  | $10   |`,
        `      | Gadget  | $20   |`,
    ].join('\n'),

    /** Multiple Scenarios in one feature file */
    multipleScenarios: [
        `Feature: User Profile`,
        ``,
        `  Scenario: View profile`,
        `    Given I am logged in`,
        `    When I visit my profile`,
        `    Then I see my details`,
        ``,
        `  Scenario: Edit profile`,
        `    Given I am logged in`,
        `    When I edit my profile`,
        `    Then my changes are saved`,
    ].join('\n'),

    /** Scenario Outline with tags on the outline AND on the Examples block */
    outlineWithExampleTags: [
        `@feature-tag`,
        `Feature: Mobile Login`,
        ``,
        `  @outline-tag`,
        `  Scenario Outline: Login as <role>`,
        `    Given I am a "<role>" user`,
        `    When I log in`,
        `    Then I see the "<dashboard>" dashboard`,
        ``,
        `    @examples-tag`,
        `    Examples:`,
        `      | role  | dashboard |`,
        `      | admin | admin     |`,
        `      | guest | public    |`,
    ].join('\n'),

    /** The AddToBag.feature example from the user */
    addToBag: [
        `@AddToBag @OWNER=ConfidenceToBuy @FEATURE=BagV2`,
        `Feature: Add to Bag`,
        `  As a user`,
        `  I want to be able to add products to my Bag`,
        `  So that I can add my products to my Bag ready for checkout`,
        ``,
        `  @TMSLINK=SHOP-1776 @SEVERITY=Critical`,
        `  Scenario: Adding sized item to Bag from Product Display Page`,
        `    Given the user is on a Product Display Page displaying a size which is in stock`,
        `    When adding this size to the Bag`,
        `    Then this product should appear in their Bag`,
        ``,
        `  @AddToBag-002 @SEVERITY=Critical`,
        `  Scenario: Adding a discounted item to the Bag`,
        `    Given the user is on a discounted Product's Display Page displaying a size which is in stock`,
        `    When adding this size to the Bag`,
        `    Then this product should appear in their Bag with the correct discount applied`,
    ].join('\n'),
};
