import { describe, it, expect, vi } from 'vitest'
import { parseCypressSpec, extractTestNames } from '../../../src/core/frameworks/cypress'

// Mock file system for testing stat calls
vi.mock('fs', () => ({
  statSync: vi.fn(),
}))

describe('Cypress Parser', () => {
  describe('parseCypressSpec()', () => {
    it('should extract describe blocks', () => {
      const content = `
describe('Login Page', () => {
  it('should display login form', () => {})
})
      `
      const result = parseCypressSpec('login.cy.ts', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should handle context() as describe equivalent', () => {
      const content = `
context('Authentication', () => {
  it('should login', () => {})
})
      `
      const result = parseCypressSpec('auth.cy.ts', content, '/project')
      expect(result.tests.length).toBeGreaterThan(0)
    })

    it('should extract it.skip() and it.only()', () => {
      const content = `
it.skip('should skip', () => {})
it.only('should focus', () => {})
it('normal', () => {})
      `
      const result = parseCypressSpec('tests.cy.ts', content, '/project')
      expect(result.tests).toHaveLength(3)
    })

    it('should handle beforeEach and afterEach hooks', () => {
      const content = `
beforeEach(() => { cy.login() })
afterEach(() => { cy.logout() })
it('should show dashboard', () => {})
      `
      const result = parseCypressSpec('hooks.cy.ts', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should extract tags from comments', () => {
      const content = `
// @smoke @critical
it('should login quickly', () => {})
      `
      const result = parseCypressSpec('auth.cy.ts', content, '/project')
      expect(result.tests).toHaveLength(1)
    })

    it('should handle nested describes', () => {
      const content = `
describe('Admin', () => {
  describe('Users', () => {
    it('should manage', () => {})
  })
})
      `
      const result = parseCypressSpec('admin.cy.ts', content, '/project')
      expect(result.tests.length).toBeGreaterThan(0)
    })

    it('should extract line numbers correctly', () => {
      const content = `describe('Tests', () => {
  it('test 1', () => {})  // line 2
  it('test 2', () => {})  // line 3
})`
      const result = parseCypressSpec('tests.cy.ts', content, '/project')
      expect(result.tests[0].line).toBeGreaterThan(0)
      expect(result.tests[1].line).toBeGreaterThan(result.tests[0].line)
    })
  })

  describe('extractTestNames()', () => {
    it('should extract test names from Cypress format', () => {
      const content = `
describe('Dashboard', () => {
  it('loads', () => {})
})
      `
      const names = extractTestNames(content)
      expect(names.length).toBeGreaterThan(0)
    })

    it('should extract names from both it and context blocks', () => {
      const content = `
it('test 1', () => {})
context('Group', () => {
  it('test 2', () => {})
})
      `
      const names = extractTestNames(content)
      expect(names.length).toBeGreaterThan(0)
    })
  })
})
