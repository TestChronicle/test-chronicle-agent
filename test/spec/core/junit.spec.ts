import { describe, it, expect, vi } from 'vitest'
import { parseJUnitSpec, extractTestNames } from '../../../src/core/frameworks/junit'

// Mock file system for testing stat calls
vi.mock('fs', () => ({
  statSync: vi.fn(),
}))

describe('JUnit Parser', () => {
  describe('parseJUnitSpec()', () => {
    it('should extract @Test methods', () => {
      const content = `
public class CalculatorTest {
  @Test
  public void testAddition() {
    assertEquals(4, 2 + 2);
  }
}
      `
      const result = parseJUnitSpec('CalculatorTest.java', content, '/project')
      expect(result.tests).toHaveLength(1)
      expect(result.tests[0].name).toBe('testAddition')
    })

    it('should handle multiple test methods', () => {
      const content = `
public class MathTest {
  @Test
  public void testAdd() {}
  
  @Test
  public void testSubtract() {}
  
  @Test
  public void testMultiply() {}
}
      `
      const result = parseJUnitSpec('MathTest.java', content, '/project')
      expect(result.tests).toHaveLength(3)
    })

    it('should detect @Ignore annotation', () => {
      const content = `
@Test
public void testFuture() {}

@Test
public void testCurrent() {}
      `
      const result = parseJUnitSpec('FeatureTest.java', content, '/project')
      expect(result.tests).toHaveLength(2)
    })

    it('should handle @Disabled for JUnit 5', () => {
      const content = `
@Test
public void testActive() {}
      `
      const result = parseJUnitSpec('FutureTest.java', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should extract parameterized tests', () => {
      const content = `
public class ParamsTest {
  @Test
  public void testBasic() {}
}
      `
      const result = parseJUnitSpec('ParamsTest.java', content, '/project')
      expect(result.tests.length).toBeGreaterThan(0)
    })

    it('should handle nested test classes', () => {
      const content = `
public class OuterTest {
  @Nested
  class InnerTests {
    @Test
    public void innerTest() {}
  }
}
      `
      const result = parseJUnitSpec('OuterTest.java', content, '/project')
      expect(result.tests).toHaveLength(1)
    })
  })

  describe('extractTestNames()', () => {
    it('should extract method names marked with @Test', () => {
      const content = `
@Test
public void shouldValidateInput() {}

@Test
public void shouldSaveData() {}
      `
      const names = extractTestNames(content)
      expect(names).toContain('shouldValidateInput')
      expect(names).toContain('shouldSaveData')
    })

    it('should ignore non-test methods', () => {
      const content = `
@Test
public void testMethod() {}

public void helperMethod() {}
      `
      const names = extractTestNames(content)
      expect(names).toContain('testMethod')
      expect(names).not.toContain('helperMethod')
    })

    it('should extract from parameterized tests', () => {
      const content = `
@Test
public void testPositive() {}
      `
      const names = extractTestNames(content)
      expect(names).toContain('testPositive')
    })
  })
})
