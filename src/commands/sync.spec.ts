import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { syncCommand } from './sync'
import * as coreModule from '../core'
import * as gitModule from '../git'
import * as syncClientModule from '../sync-client'

// Mock dependencies
vi.mock('../core', () => ({
  detectFramework: vi.fn(),
  parseAllSpecs: vi.fn(),
}))

vi.mock('../git', () => ({
  buildHistory: vi.fn(),
}))

vi.mock('../sync-client', () => ({
  syncToDashboard: vi.fn(),
}))

vi.mock('dotenv', () => ({
  default: {
    config: vi.fn(),
  },
}))

vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(() => false),
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
  },
}))

describe('sync command', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Reset environment variables
    delete process.env.CHRONICLE_PROJECT_ID
    delete process.env.CHRONICLE_DASHBOARD_URL
    delete process.env.CHRONICLE_API_KEY

    // Suppress console output during tests
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('validation', () => {
    it('should fail if project ID is missing', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      await syncCommand.parseAsync(['node', 'test'])
      
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Missing project ID'))
      expect(exitSpy).toHaveBeenCalledWith(1)
      
      exitSpy.mockRestore()
      errorSpy.mockRestore()
    })

    it('should fail if API key is missing', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      process.env.CHRONICLE_PROJECT_ID = 'test-project-id'
      
      await syncCommand.parseAsync(['node', 'test'])
      
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Missing API key'))
      expect(exitSpy).toHaveBeenCalledWith(1)
      
      exitSpy.mockRestore()
      errorSpy.mockRestore()
    })

    it('should accept project ID from --project-id flag', async () => {
      vi.mocked(coreModule.detectFramework).mockReturnValue({
        framework: 'vitest' as const,
        testDir: './tests',
        confidence: 'high',
      })

      vi.mocked(coreModule.parseAllSpecs).mockReturnValue([])
      vi.mocked(gitModule.buildHistory).mockResolvedValue([])
      vi.mocked(syncClientModule.syncToDashboard).mockResolvedValue({
        success: true,
        projectId: 'test-project-id',
        synced_at: new Date().toISOString(),
      })

      process.env.CHRONICLE_API_KEY = 'test-api-key'

      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await syncCommand.parseAsync(['node', 'test', '--project-id', 'my-project'])

      expect(vi.mocked(coreModule.detectFramework)).toHaveBeenCalled()
      expect(vi.spyOn(console, 'log')).toHaveBeenCalledWith(expect.stringContaining('Sync successful'))

      logSpy.mockRestore()
    })
  })

  describe('framework detection', () => {
    beforeEach(() => {
      process.env.CHRONICLE_PROJECT_ID = 'test-project-id'
      process.env.CHRONICLE_API_KEY = 'test-api-key'
    })

    it('should detect framework with high confidence', async () => {
      vi.mocked(coreModule.detectFramework).mockReturnValue({
        framework: 'playwright' as const,
        testDir: './tests',
        confidence: 'high',
      })

      vi.mocked(coreModule.parseAllSpecs).mockReturnValue([])
      vi.mocked(gitModule.buildHistory).mockResolvedValue([])
      vi.mocked(syncClientModule.syncToDashboard).mockResolvedValue({
        success: true,
        projectId: 'test-project-id',
        synced_at: new Date().toISOString(),
      })

      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await syncCommand.parseAsync(['node', 'test'])

      expect(vi.mocked(coreModule.detectFramework)).toHaveBeenCalled()
      expect(vi.spyOn(console, 'log')).toHaveBeenCalledWith(expect.stringContaining('Detected framework: playwright'))

      logSpy.mockRestore()
    })
  })

  describe('spec parsing', () => {
    beforeEach(() => {
      process.env.CHRONICLE_PROJECT_ID = 'test-project-id'
      process.env.CHRONICLE_API_KEY = 'test-api-key'
    })

    it('should parse all specs', async () => {
      const mockSpecs = [
        {
          id: 'spec-1',
          path: 'tests/auth.spec.ts',
          name: 'auth.spec.ts',
          framework: 'vitest' as const,
          testCount: 3,
          lastModified: new Date().toISOString(),
          tests: [
            {
              id: 'test-1',
              name: 'should login',
              fullName: 'Auth > should login',
              line: 10,
              tags: [],
            },
          ],
        },
        {
          id: 'spec-2',
          path: 'tests/dashboard.spec.ts',
          name: 'dashboard.spec.ts',
          framework: 'vitest' as const,
          testCount: 5,
          lastModified: new Date().toISOString(),
          tests: [
            {
              id: 'test-2',
              name: 'should render dashboard',
              fullName: 'Dashboard > should render dashboard',
              line: 15,
              tags: [],
            },
          ],
        },
      ]

      vi.mocked(coreModule.detectFramework).mockReturnValue({
        framework: 'vitest' as const,
        testDir: './tests',
        confidence: 'high',
      })

      vi.mocked(coreModule.parseAllSpecs).mockReturnValue(mockSpecs)
      vi.mocked(gitModule.buildHistory).mockResolvedValue([])
      vi.mocked(syncClientModule.syncToDashboard).mockResolvedValue({
        success: true,
        projectId: 'test-project-id',
        synced_at: new Date().toISOString(),
      })

      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await syncCommand.parseAsync(['node', 'test'])

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Found 2 spec files'))
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Total tests: 8'))

      logSpy.mockRestore()
    })

    it('should handle empty spec list', async () => {
      vi.mocked(coreModule.detectFramework).mockReturnValue({
        framework: 'vitest' as const,
        testDir: './tests',
        confidence: 'high',
      })

      vi.mocked(coreModule.parseAllSpecs).mockReturnValue([])
      vi.mocked(gitModule.buildHistory).mockResolvedValue([])
      vi.mocked(syncClientModule.syncToDashboard).mockResolvedValue({
        success: true,
        projectId: 'test-project-id',
        synced_at: new Date().toISOString(),
      })

      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await syncCommand.parseAsync(['node', 'test'])

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Found 0 spec files'))

      logSpy.mockRestore()
    })
  })

  describe('git history', () => {
    beforeEach(() => {
      process.env.CHRONICLE_PROJECT_ID = 'test-project-id'
      process.env.CHRONICLE_API_KEY = 'test-api-key'
    })

    it('should build git history', async () => {
      const mockHistory = [
        {
          commit: {
            hash: 'abc123',
            shortHash: 'abc12',
            message: 'Add login tests',
            author: 'John Doe',
            date: new Date().toISOString(),
            changes: [],
          },
          specs: [
            {
              specPath: 'tests/auth.spec.ts',
              fileStatus: 'modified' as const,
              changes: [
                {
                  name: 'should login',
                  type: 'added' as const,
                },
              ],
            },
          ],
        },
      ]

      vi.mocked(coreModule.detectFramework).mockReturnValue({
        framework: 'vitest' as const,
        testDir: './tests',
        confidence: 'high',
      })

      vi.mocked(coreModule.parseAllSpecs).mockReturnValue([])
      vi.mocked(gitModule.buildHistory).mockResolvedValue(mockHistory)
      vi.mocked(syncClientModule.syncToDashboard).mockResolvedValue({
        success: true,
        projectId: 'test-project-id',
        synced_at: new Date().toISOString(),
      })

      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await syncCommand.parseAsync(['node', 'test'])

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Built history for 1 commits'))

      logSpy.mockRestore()
    })
  })

  describe('tag statistics', () => {
    beforeEach(() => {
      process.env.CHRONICLE_PROJECT_ID = 'test-project-id'
      process.env.CHRONICLE_API_KEY = 'test-api-key'
    })

    it('should compute tag statistics', async () => {
      const mockSpecs = [
        {
          id: 'spec-1',
          path: 'tests/auth.spec.ts',
          name: 'auth.spec.ts',
          framework: 'vitest' as const,
          testCount: 2,
          lastModified: new Date().toISOString(),
          tests: [
            {
              id: 'test-1',
              name: 'should login',
              fullName: 'Auth > should login',
              line: 10,
              tags: [{ name: 'smoke' }, { name: 'critical' }],
            },
            {
              id: 'test-2',
              name: 'should logout',
              fullName: 'Auth > should logout',
              line: 20,
              tags: [{ name: 'smoke' }],
            },
          ],
        },
      ]

      vi.mocked(coreModule.detectFramework).mockReturnValue({
        framework: 'vitest' as const,
        testDir: './tests',
        confidence: 'high',
      })

      vi.mocked(coreModule.parseAllSpecs).mockReturnValue(mockSpecs)
      vi.mocked(gitModule.buildHistory).mockResolvedValue([])

      let capturedPayload: any

      vi.mocked(syncClientModule.syncToDashboard).mockImplementation(async (_, __, payload) => {
        capturedPayload = payload
        return {
          success: true,
          projectId: 'test-project-id',
          synced_at: new Date().toISOString(),
        }
      })

      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await syncCommand.parseAsync(['node', 'test'])

      expect(capturedPayload.stats.tags).toEqual({
        smoke: 2,
        critical: 1,
      })

      logSpy.mockRestore()
    })
  })

  describe('sync to dashboard', () => {
    beforeEach(() => {
      process.env.CHRONICLE_PROJECT_ID = 'test-project-id'
      process.env.CHRONICLE_API_KEY = 'test-api-key'
    })

    it('should call syncToDashboard with correct payload', async () => {
      const mockSpecs = [
        {
          id: 'spec-1',
          path: 'tests/auth.spec.ts',
          name: 'auth.spec.ts',
          framework: 'vitest' as const,
          testCount: 1,
          lastModified: new Date().toISOString(),
          tests: [
            {
              id: 'test-1',
              name: 'should login',
              fullName: 'Auth > should login',
              line: 10,
              tags: [{ name: 'smoke' }],
            },
          ],
        },
      ]

      vi.mocked(coreModule.detectFramework).mockReturnValue({
        framework: 'vitest' as const,
        testDir: './tests',
        confidence: 'high',
      })

      vi.mocked(coreModule.parseAllSpecs).mockReturnValue(mockSpecs)
      vi.mocked(gitModule.buildHistory).mockResolvedValue([])
      vi.mocked(syncClientModule.syncToDashboard).mockResolvedValue({
        success: true,
        projectId: 'test-project-id',
        synced_at: new Date().toISOString(),
      })

      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await syncCommand.parseAsync(['node', 'test'])

      expect(vi.mocked(syncClientModule.syncToDashboard)).toHaveBeenCalledWith(
        'http://localhost:3000',
        'test-api-key',
        expect.objectContaining({
          projectId: 'test-project-id',
          specs: expect.arrayContaining([
            expect.objectContaining({
              filePath: 'tests/auth.spec.ts',
              framework: 'vitest',
              tests: expect.arrayContaining([
                expect.objectContaining({
                  name: 'should login',
                  lineNumber: 10,
                  tags: ['smoke'],
                }),
              ]),
            }),
          ]),
          stats: expect.objectContaining({
            totalSpecs: 1,
            totalTests: 1,
            tags: { smoke: 1 },
          }),
        })
      )

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Sync successful'))

      logSpy.mockRestore()
    })
  })

  describe('error handling', () => {
    beforeEach(() => {
      process.env.CHRONICLE_PROJECT_ID = 'test-project-id'
      process.env.CHRONICLE_API_KEY = 'test-api-key'
    })

    it('should handle sync error gracefully', async () => {
      vi.mocked(coreModule.detectFramework).mockReturnValue({
        framework: 'vitest' as const,
        testDir: './tests',
        confidence: 'high',
      })

      vi.mocked(coreModule.parseAllSpecs).mockReturnValue([])
      vi.mocked(gitModule.buildHistory).mockResolvedValue([])

      const error = new Error('Network error: Connection refused')
      vi.mocked(syncClientModule.syncToDashboard).mockRejectedValue(error)

      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)

      await syncCommand.parseAsync(['node', 'test'])

      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Error during sync'))
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Network error'))
      expect(exitSpy).toHaveBeenCalledWith(1)

      errorSpy.mockRestore()
      exitSpy.mockRestore()
    })

    it('should handle non-Error exceptions', async () => {
      vi.mocked(coreModule.detectFramework).mockReturnValue({
        framework: 'vitest' as const,
        testDir: './tests',
        confidence: 'high',
      })

      vi.mocked(coreModule.parseAllSpecs).mockReturnValue([])
      vi.mocked(gitModule.buildHistory).mockResolvedValue([])
      vi.mocked(syncClientModule.syncToDashboard).mockRejectedValue('Unknown error')

      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)

      await syncCommand.parseAsync(['node', 'test'])

      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Unknown error'))
      expect(exitSpy).toHaveBeenCalledWith(1)

      errorSpy.mockRestore()
      exitSpy.mockRestore()
    })
  })
})
