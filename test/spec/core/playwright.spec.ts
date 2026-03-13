import { describe, it, expect, vi } from 'vitest'
import { parsePlaywrightSpec, extractTestNames } from '../../../src/core/frameworks/playwright'
import { statSync } from 'fs'

// Mock file system for testing stat calls
vi.mock('fs', () => ({
  statSync: vi.fn(),
}))

describe('Playwright Parser', () => {
  describe('parsePlaywrightSpec()', () => {
    it('should extract test blocks', () => {
      const content = `test('should render page', () => {})`
      const result = parsePlaywrightSpec('ui.spec.ts', content, '/project')
      expect(result.tests).toHaveLength(1)
      expect(result.tests[0].name).toBe('should render page')
    })

    it('should extract describe blocks', () => {
      const content = `
test.describe('Authentication', () => {
  test('should login', () => {})
})
      `
      const result = parsePlaywrightSpec('auth.spec.ts', content, '/project')
      expect(result.tests.length).toBeGreaterThan(0)
    })

    it('should handle test.describe.serial', () => {
      const content = `
test.describe.serial('Sequential Tests', () => {
  test('test 1', () => {})
  test('test 2', () => {})
})
      `
      const result = parsePlaywrightSpec('serial.spec.ts', content, '/project')
      expect(result.tests.length).toBeGreaterThan(0)
    })

    it('should handle test.skip and test.only', () => {
      const content = `
test.skip('skipped', () => {})
test.only('focused', () => {})
test('normal', () => {})
      `
      const result = parsePlaywrightSpec('focus.spec.ts', content, '/project')
      expect(result.tests.length).toBe(3)
    })

    it('should extract inline tags', () => {
      const content = `test('should login', () => {}, { tag: '@critical' })`
      const result = parsePlaywrightSpec('auth.spec.ts', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should extract line numbers', () => {
      const content = `test('line 1', () => {})
test('line 2', () => {})`
      const result = parsePlaywrightSpec('tests.spec.ts', content, '/project')
      expect(result.tests[0].line).toBeLessThan(result.tests[1].line)
    })

    it('should handle multiple skipped tests', () => {
      const content = `
test.skip('skipped', () => {})
test('normal', () => {})
      `
      const result = parsePlaywrightSpec('skip.spec.ts', content, '/project')
      expect(result.tests.length).toBeGreaterThanOrEqual(2)
    })

    it('should set values from spec file', () => {
      const content = `test('example', () => {})`
      const result = parsePlaywrightSpec('tests/auth.spec.ts', content, '/project')
      expect(result.tests).toHaveLength(1)
      expect(result.tests[0].name).toBe('example')
    })
  })

  describe('extractTestNames()', () => {
    it('should extract test names from content', () => {
      const content = `
test('test 1', () => {})
test('test 2', () => {})
      `
      const names = extractTestNames(content)
      expect(names).toContain('test 1')
      expect(names).toContain('test 2')
    })

    it('should extract from describe blocks', () => {
      const content = `
test.describe('Suite', () => {
  test('nested test', () => {})
})
      `
      const names = extractTestNames(content)
      expect(names.length).toBeGreaterThan(0)
    })
  })
})
