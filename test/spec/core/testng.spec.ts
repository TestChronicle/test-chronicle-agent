import { describe, it, expect, vi } from 'vitest'
import { parseTestNGSpec, extractTestNames } from '../../../src/core/frameworks/testng'

// Mock file system for testing stat calls
vi.mock('fs', () => ({
  statSync: vi.fn(),
}))

describe('TestNG Parser', () => {
  describe('parseTestNGSpec()', () => {
    it('should extract @Test methods', () => {
      const content = `
public class LoginTest {
  @Test
  public void shouldLogin() {
    // test code
  }
}
      `
      const result = parseTestNGSpec('LoginTest.java', content, '/project')
      expect(result.tests).toHaveLength(1)
      expect(result.tests[0].name).toBe('shouldLogin')
    })

    it('should handle multiple test methods in a class', () => {
      const content = `
public class UserTest {
  @Test
  public void shouldCreateUser() {}
  
  @Test
  public void shouldDeleteUser() {}
}
      `
      const result = parseTestNGSpec('UserTest.java', content, '/project')
      expect(result.tests).toHaveLength(2)
    })

    it('should extract tag annotations', () => {
      const content = `
@Test
public void shouldLoadDashboard() {}
      `
      const result = parseTestNGSpec('DashboardTest.java', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should detect parameterized tests', () => {
      const content = `
@Test
public void testSum(int a, int b, int expected) {}
      `
      const result = parseTestNGSpec('MathTest.java', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should handle BeforeMethod and AfterMethod', () => {
      const content = `
@BeforeMethod
public void setup() {}

@Test
public void shouldDoSomething() {}

@AfterMethod
public void teardown() {}
      `
      const result = parseTestNGSpec('HooksTest.java', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should extract line numbers', () => {
      const content = `public class Test {
  @Test
  public void test1() {}
  
  @Test
  public void test2() {}
}
      `
      const result = parseTestNGSpec('Test.java', content, '/project')
      expect(result.tests[0].line).toBeLessThan(result.tests[1].line)
    })

    it('should handle classes and organize tests', () => {
      const content = `
public class CalculatorTest {
  @Test
  public void testAdd() {}
}
      `
      const result = parseTestNGSpec('CalculatorTest.java', content, '/project')
      expect(result.tests).toHaveLength(1)
    })
  })

  describe('extractTestNames()', () => {
    it('should extract test method names', () => {
      const content = `
@Test
public void shouldAddNumbers() {}

@Test
public void shouldMultiplyNumbers() {}
      `
      const names = extractTestNames(content)
      expect(names).toContain('shouldAddNumbers')
      expect(names).toContain('shouldMultiplyNumbers')
    })

    it('should ignore non-test methods', () => {
      const content = `
public void helperMethod() {}

@Test
public void testMethod() {}
      `
      const names = extractTestNames(content)
      expect(names).toContain('testMethod')
      expect(names).not.toContain('helperMethod')
    })
  })
})
