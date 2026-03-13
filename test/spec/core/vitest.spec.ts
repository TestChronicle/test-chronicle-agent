import { describe, it, expect, vi } from 'vitest'
import { parseVitestSpec, extractTestNames } from '../../../src/core/frameworks/vitest'

// Mock file system for testing stat calls
vi.mock('fs', () => ({
  statSync: vi.fn(),
}))

describe('Vitest Parser', () => {
  describe('parseVitestSpec()', () => {
    it('should extract test() blocks', () => {
      const content = `
test('should add numbers', () => {
  expect(1 + 1).toBe(2)
})
      `
      const result = parseVitestSpec('math.test.ts', content, '/project')
      expect(result.tests).toHaveLength(1)
      expect(result.tests[0].name).toBe('should add numbers')
    })

    it('should extract it() blocks', () => {
      const content = `
it('should multiply', () => {
  expect(2 * 3).toBe(6)
})
      `
      const result = parseVitestSpec('math.test.ts', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should extract describe blocks', () => {
      const content = `
describe('Math', () => {
  it('should add', () => {})
  it('should subtract', () => {})
})
      `
      const result = parseVitestSpec('math.test.ts', content, '/project')
      expect(result.tests).toHaveLength(2)
    })

    it('should handle nested describe blocks', () => {
      const content = `
describe('Utils', () => {
  describe('String', () => {
    it('should uppercase', () => {})
  })
})
      `
      const result = parseVitestSpec('utils.test.ts', content, '/project')
      expect(result.tests.length).toBeGreaterThan(0)
    })

    it('should extract async test markers', () => {
      const content = `
test('async test', async () => {
  await expect(Promise.resolve(1)).resolves.toBe(1)
})
      `
      const result = parseVitestSpec('async.test.ts', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should handle test.skip() and test.only()', () => {
      const content = `
test.skip('skipped test', () => {})
test.only('focused test', () => {})
test('normal test', () => {})
      `
      const result = parseVitestSpec('focus.test.ts', content, '/project')
      expect(result.tests).toHaveLength(3)
    })

    it('should handle multiple tests in sequence', () => {
      const content = `
test('test 1', () => {})
test('test 2', () => {})
test('test 3', () => {})
      `
      const result = parseVitestSpec('tests.test.ts', content, '/project')
      expect(result.tests.length).toBeGreaterThanOrEqual(3)
    })

    it('should extract line numbers accurately', () => {
      const content = `
describe('Suite', () => {
  it('test 1', () => {})  // line 2
  it('test 2', () => {})  // line 3
})
      `
      const result = parseVitestSpec('suite.test.ts', content, '/project')
      expect(result.tests[0].line).toBeGreaterThan(0)
      expect(result.tests[1].line).toBeGreaterThan(result.tests[0].line)
    })
  })

  describe('extractTestNames()', () => {
    it('should extract test names from Vitest format', () => {
      const content = `
test('add', () => {})
test('subtract', () => {})
      `
      const names = extractTestNames(content)
      expect(names).toContain('add')
      expect(names).toContain('subtract')
    })

    it('should extract names from describe blocks', () => {
      const content = `
describe('Math', () => {
  it('adds', () => {})
  it('subtracts', () => {})
})
      `
      const names = extractTestNames(content)
      expect(names.length).toBeGreaterThan(0)
    })
  })
})
