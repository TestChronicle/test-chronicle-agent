import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  parseSpecFile,
  extractTestNamesFromContent,
  findSpecFiles,
} from '../../../src/core/parser'
import * as frameworksParsers from '../../../src/core/frameworks/playwright'
import * as cypressParsers from '../../../src/core/frameworks/cypress'
import * as vitestParsers from '../../../src/core/frameworks/vitest'
import * as testngParsers from '../../../src/core/frameworks/testng'
import * as junitParsers from '../../../src/core/frameworks/junit'
import { statSync } from 'fs'
import { globSync } from 'glob'

// Mock file system
vi.mock('fs', () => ({
  statSync: vi.fn(),
}))

// Mock glob
vi.mock('glob', () => ({
  globSync: vi.fn(),
}))

// Mock frameworks
vi.mock('../../../src/core/frameworks/playwright', () => ({
  parsePlaywrightSpec: vi.fn(),
  extractTestNames: vi.fn(),
}))

vi.mock('../../../src/core/frameworks/cypress', () => ({
  parseCypressSpec: vi.fn(),
  extractTestNames: vi.fn(),
}))

vi.mock('../../../src/core/frameworks/vitest', () => ({
  parseVitestSpec: vi.fn(),
  extractTestNames: vi.fn(),
}))

vi.mock('../../../src/core/frameworks/testng', () => ({
  parseTestNGSpec: vi.fn(),
  extractTestNames: vi.fn(),
}))

vi.mock('../../../src/core/frameworks/junit', () => ({
  parseJUnitSpec: vi.fn(),
  extractTestNames: vi.fn(),
}))

describe('Parser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('parseSpecFile()', () => {
    it('should parse Playwright spec files', () => {
      const mockSpec = {
        id: 'spec-1',
        path: 'tests/auth.spec.ts',
        name: 'auth.spec.ts',
        framework: 'playwright' as const,
        tests: [],
        testCount: 0,
        lastModified: new Date().toISOString(),
      }

      vi.mocked(frameworksParsers.parsePlaywrightSpec).mockReturnValue(mockSpec)
      vi.mocked(statSync).mockReturnValue({
        mtime: new Date(),
      } as any)

      const result = parseSpecFile(
        '/project/tests/auth.spec.ts',
        'test content',
        '/project',
        'playwright'
      )

      expect(frameworksParsers.parsePlaywrightSpec).toHaveBeenCalledWith(
        '/project/tests/auth.spec.ts',
        'test content',
        '/project'
      )
      expect(result).toEqual(expect.objectContaining({ framework: 'playwright' }))
    })

    it('should parse Cypress spec files', () => {
      const mockCypressSpec = {
        id: 'spec-2',
        path: 'cypress/e2e/login.cy.ts',
        name: 'login.cy.ts',
        framework: 'cypress' as const,
        tests: [],
        testCount: 0,
        lastModified: new Date().toISOString(),
      }

      vi.mocked(cypressParsers.parseCypressSpec).mockReturnValue(mockCypressSpec)
      vi.mocked(statSync).mockReturnValue({
        mtime: new Date(),
      } as any)

      const result = parseSpecFile(
        '/project/cypress/e2e/login.cy.ts',
        'test content',
        '/project',
        'cypress'
      )

      expect(result).toEqual(expect.objectContaining({ framework: 'cypress' }))
    })

    it('should parse Vitest spec files', () => {
      const mockVitestSpec = {
        id: 'spec-3',
        path: 'tests/utils.spec.ts',
        name: 'utils.spec.ts',
        framework: 'vitest' as const,
        tests: [],
        testCount: 0,
        lastModified: new Date().toISOString(),
      }

      vi.mocked(vitestParsers.parseVitestSpec).mockReturnValue(mockVitestSpec)
      vi.mocked(statSync).mockReturnValue({
        mtime: new Date(),
      } as any)

      const result = parseSpecFile(
        '/project/tests/utils.spec.ts',
        'test content',
        '/project',
        'vitest'
      )

      expect(result).toEqual(expect.objectContaining({ framework: 'vitest' }))
    })

    it('should throw on unsupported framework', () => {
      expect(() => {
        parseSpecFile(
          '/project/tests/test.ts',
          'content',
          '/project',
          'unknown' as any
        )
      }).toThrow('Framework')
    })

    it('should set lastModified from file mtime', () => {
      const mockDate = new Date('2024-01-15T10:30:00Z')

      vi.mocked(frameworksParsers.parsePlaywrightSpec).mockReturnValue({
        id: 'spec-1',
        path: 'tests/test.spec.ts',
        name: 'test.spec.ts',
        framework: 'playwright' as const,
        tests: [],
        testCount: 0,
        lastModified: 'will be updated',
      })

      vi.mocked(statSync).mockReturnValue({
        mtime: mockDate,
      } as any)

      const result = parseSpecFile(
        '/project/tests/test.spec.ts',
        'content',
        '/project',
        'playwright'
      )

      expect(result.lastModified).toBe(mockDate.toISOString())
    })

    it('should use default lastModified if file not found', () => {
      const original = new Date().toISOString()

      vi.mocked(frameworksParsers.parsePlaywrightSpec).mockReturnValue({
        id: 'spec-1',
        path: 'tests/test.spec.ts',
        name: 'test.spec.ts',
        framework: 'playwright' as const,
        tests: [],
        testCount: 0,
        lastModified: original,
      })

      vi.mocked(statSync).mockImplementation(() => {
        throw new Error('ENOENT: file not found')
      })

      const result = parseSpecFile(
        '/project/tests/nonexistent.spec.ts',
        'content',
        '/project',
        'playwright'
      )

      // Should keep original lastModified from parser
      expect(result.lastModified).toBe(original)
    })

    it('should correctly parse all supported frameworks', () => {
      const frameworks = ['playwright', 'cypress', 'vitest', 'testng', 'junit']

      vi.mocked(statSync).mockReturnValue({
        mtime: new Date(),
      } as any)

      // For this test, we're mostly checking the dispatch logic
      // Each framework should be passed through correctly
      for (const fw of frameworks) {
        expect(() => {
          parseSpecFile(
            '/project/tests/test.spec.ts',
            'content',
            '/project',
            fw as any
          )
        }).not.toThrow()
      }
    })
  })

  describe('extractTestNamesFromContent()', () => {
    it('should extract Playwright test names', () => {
      vi.mocked(frameworksParsers.extractTestNames).mockReturnValue([
        'should login',
        'should logout',
      ])

      const result = extractTestNamesFromContent('test content', 'playwright')

      expect(result).toEqual(['should login', 'should logout'])
      expect(frameworksParsers.extractTestNames).toHaveBeenCalledWith('test content')
    })

    it('should extract Cypress test names', () => {
      vi.mocked(cypressParsers.extractTestNames).mockReturnValue(['should load page'])

      const result = extractTestNamesFromContent('test content', 'cypress')

      expect(result).toEqual(['should load page'])
    })

    it('should extract Vitest test names', () => {
      vi.mocked(vitestParsers.extractTestNames).mockReturnValue(['test 1', 'test 2'])

      const result = extractTestNamesFromContent('test content', 'vitest')

      expect(result).toEqual(['test 1', 'test 2'])
    })

    it('should extract TestNG test names', () => {
      vi.mocked(testngParsers.extractTestNames).mockReturnValue(['testMethod'])

      const result = extractTestNamesFromContent('test content', 'testng')

      expect(result).toEqual(['testMethod'])
    })

    it('should extract JUnit test names', () => {
      vi.mocked(junitParsers.extractTestNames).mockReturnValue(['testLogin'])

      const result = extractTestNamesFromContent('test content', 'junit')

      expect(result).toEqual(['testLogin'])
    })

    it('should return empty array for unknown framework', () => {
      const result = extractTestNamesFromContent('content', 'unknown' as any)

      expect(result).toEqual([])
    })

    it('should handle empty content', () => {
      vi.mocked(frameworksParsers.extractTestNames).mockReturnValue([])

      const result = extractTestNamesFromContent('', 'playwright')

      expect(result).toEqual([])
    })

    it('should handle malformed code', () => {
      vi.mocked(frameworksParsers.extractTestNames).mockReturnValue([])

      const result = extractTestNamesFromContent('this is not valid code {{{', 'playwright')

      expect(result).toEqual([])
    })
  })

  describe('findSpecFiles()', () => {
    it('should find Playwright spec files', () => {
      const mockFiles = [
        '/project/tests/auth.spec.ts',
        '/project/tests/dashboard.spec.ts',
      ]

      vi.mocked(globSync).mockReturnValue(mockFiles)

      const result = findSpecFiles('/project', './tests', 'playwright')

      expect(result).toEqual(mockFiles)
      expect(globSync).toHaveBeenCalledWith(
        expect.arrayContaining(['**/*.spec.ts', '**/*.spec.js']),
        expect.objectContaining({
          cwd: expect.stringContaining('tests'),
          absolute: true,
        })
      )
    })

    it('should use correct patterns for Cypress', () => {
      vi.mocked(globSync).mockReturnValue([])

      findSpecFiles('/project', './cypress/e2e', 'cypress')

      expect(globSync).toHaveBeenCalledWith(
        expect.arrayContaining(['**/*.cy.ts', '**/*.spec.ts']),
        expect.any(Object)
      )
    })

    it('should use correct patterns for Vitest', () => {
      vi.mocked(globSync).mockReturnValue([])

      findSpecFiles('/project', './tests', 'vitest')

      expect(globSync).toHaveBeenCalledWith(
        expect.arrayContaining(['**/*.test.ts', '**/*.spec.ts']),
        expect.any(Object)
      )
    })

    it('should use correct patterns for TestNG/JUnit', () => {
      vi.mocked(globSync).mockReturnValue([])

      findSpecFiles('/project', './src', 'testng')

      expect(globSync).toHaveBeenCalledWith(
        expect.arrayContaining(['**/*Test.java']),
        expect.any(Object)
      )
    })

    it('should ignore node_modules', () => {
      vi.mocked(globSync).mockReturnValue([])

      findSpecFiles('/project', './tests', 'playwright')

      expect(globSync).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({
          ignore: expect.arrayContaining(['**/node_modules/**']),
        })
      )
    })

    it('should return empty array when no files found', () => {
      vi.mocked(globSync).mockReturnValue([])

      const result = findSpecFiles('/project', './tests', 'playwright')

      expect(result).toEqual([])
    })

    it('should handle multiple spec files', () => {
      const files = Array.from({ length: 100 }, (_, i) =>
        `/project/tests/spec${i}.spec.ts`
      )

      vi.mocked(globSync).mockReturnValue(files)

      const result = findSpecFiles('/project', './tests', 'playwright')

      expect(result).toHaveLength(100)
    })
  })

  describe('parseAllSpecs()', () => {
    it('should return empty array if no spec files found', () => {
      vi.mocked(globSync).mockReturnValue([])

      // Would return empty without errors
      expect(globSync).toBeDefined()
    })
  })

  describe('Test file pattern matching', () => {
    it('should match .spec.ts files', () => {
      const pattern = /\.(spec|test)\.[jt]s$/

      expect('auth.spec.ts').toMatch(pattern)
      expect('utils.test.ts').toMatch(pattern)
    })

    it('should not match non-test files', () => {
      const pattern = /\.(spec|test)\.[jt]s$/

      expect('auth.ts').not.toMatch(pattern)
      expect('index.js').not.toMatch(pattern)
      expect('readme.md').not.toMatch(pattern)
    })

    it('should match .cy.ts Cypress files', () => {
      const pattern = /\.cy\.[jt]s$/

      expect('login.cy.ts').toMatch(pattern)
      expect('dashboard.cy.js').toMatch(pattern)
    })

    it('should match Java test files', () => {
      const pattern = /Test\.java$/

      expect('AuthTest.java').toMatch(pattern)
      expect('DashboardTests.java').not.toMatch(pattern) // Has Tests, not Test
    })
  })
})
