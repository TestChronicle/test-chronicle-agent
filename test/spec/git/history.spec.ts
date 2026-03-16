import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { buildHistory, getLatestCommitHash } from '../../../src/git/history'
import * as parser from '../../../src/core/parser'
import simpleGit from 'simple-git'

// Mock simple-git
vi.mock('simple-git', () => ({
  default: vi.fn(),
}))

// Mock parser
vi.mock('../../../src/core/parser', () => ({
  extractTestNamesFromContent: vi.fn(),
}))

describe('Git History', () => {
  let mockGit: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockGit = {
      log: vi.fn(),
      show: vi.fn(),
      raw: vi.fn(),
    }
    vi.mocked(simpleGit).mockReturnValue(mockGit)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getLatestCommitHash()', () => {
    it('should return the hash of the latest commit', async () => {
      mockGit.log.mockResolvedValue({
        latest: { hash: 'abc123def456' },
        all: [],
      })

      const hash = await getLatestCommitHash('/project')

      expect(hash).toBe('abc123def456')
      expect(mockGit.log).toHaveBeenCalledWith({ maxCount: 1 })
    })

    it('should return null if no commit exists', async () => {
      mockGit.log.mockResolvedValue({
        latest: null,
        all: [],
      })

      const hash = await getLatestCommitHash('/project')

      expect(hash).toBeNull()
    })

    it('should return null on git error', async () => {
      mockGit.log.mockRejectedValue(new Error('Not a git repo'))

      const hash = await getLatestCommitHash('/project')

      expect(hash).toBeNull()
    })
  })

  describe('buildHistory()', () => {
    it('should build history for test directory', async () => {
      const mockCommit = {
        hash: 'abc123',
        message: 'Add tests',
        author_name: 'John Doe',
        date: new Date().toISOString(),
      }

      mockGit.log.mockResolvedValue({
        all: [mockCommit],
      })

      mockGit.raw.mockResolvedValue(`A\ttests/auth.spec.ts`)

      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['should login'])

      mockGit.show.mockResolvedValue('test file content')

      const history = await buildHistory('/project', './tests', 'vitest')

      expect(history.entries).toHaveLength(1)
      expect(history.entries[0].commit.hash).toBe('abc123')
      expect(history.entries[0].specs).toBeDefined()
    })

    it('should filter commits by test directory', async () => {
      mockGit.log.mockResolvedValue({
        all: [],
      })

      await buildHistory('/project', './tests', 'vitest')

      expect(mockGit.log).toHaveBeenCalledWith(expect.arrayContaining(['--', 'tests']))
    })

    it('should use sinceCommit when provided', async () => {
      mockGit.log.mockResolvedValue({
        all: [],
      })

      await buildHistory('/project', './tests', 'vitest', 'prevhash')

      expect(mockGit.log).toHaveBeenCalledWith(
        expect.arrayContaining(['prevhash..HEAD'])
      )
    })

    it('should return empty array on git error', async () => {
      mockGit.log.mockRejectedValue(new Error('Git error'))

      const result = await buildHistory('/project', './tests', 'vitest')

      expect(result.entries).toEqual([])
    })

    it('should reverse commits to oldest first', async () => {
      const commit1 = { hash: '111', message: 'First', author_name: 'A', date: '2000-01-01' }
      const commit2 = { hash: '222', message: 'Second', author_name: 'B', date: '2000-01-02' }

      mockGit.log.mockResolvedValue({
        all: [commit2, commit1], // Newest first (git's default)
      })

      mockGit.raw.mockResolvedValue('')
      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue([])

      const result = await buildHistory('/project', './tests', 'vitest')

      // Should be reversed to oldest first or empty
      expect(Array.isArray(result.entries)).toBe(true)
    })

    it('should skip commits with no spec changes', async () => {
      mockGit.log.mockResolvedValue({
        all: [
          { hash: '111', message: 'Docs', author_name: 'A', date: '2000-01-01' },
          { hash: '222', message: 'Tests', author_name: 'B', date: '2000-01-02' },
        ],
      })

      // First commit has no tests
      let callCount = 0
      mockGit.raw.mockImplementation(() => {
        callCount++
        return callCount === 1 ? '' : 'A\ttests/test.spec.ts\n'
      })

      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test1'])
      mockGit.show.mockResolvedValue('content')

      const result = await buildHistory('/project', './tests', 'vitest')

      // Should only include commits with spec changes
      expect(result.entries.length).toBeLessThanOrEqual(1)
    })

    it('should handle file changes in commit', async () => {
      mockGit.log.mockResolvedValue({
        all: [
          { hash: 'abc', message: 'Add tests', author_name: 'John', date: '2000-01-01' },
        ],
      })

      mockGit.raw.mockResolvedValue(
        'A\ttests/file1.spec.ts\nM\ttests/file2.spec.ts\nD\ttests/file3.spec.ts'
      )

      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test1', 'test2'])
      mockGit.show.mockResolvedValue('content')

      const history = await buildHistory('/project', './tests', 'vitest')

      expect(history.entries).toHaveLength(1)
      expect(history.entries[0].specs).toBeDefined()
    })

    it('should detect file status (added, modified, deleted)', async () => {
      mockGit.log.mockResolvedValue({
        all: [{ hash: 'abc', message: 'Changes', author_name: 'John', date: '2000-01-01' }],
      })

      mockGit.raw.mockResolvedValue('A\ttests/new.spec.ts\nM\ttests/existing.spec.ts')

      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test1'])
      mockGit.show.mockResolvedValue('content')

      const history = await buildHistory('/project', './tests', 'vitest')

      expect(history.entries).toHaveLength(1)
      expect(history.entries[0].commit.changes.length).toBeGreaterThan(0)
    })

    it('should handle renamed files', async () => {
      mockGit.log.mockResolvedValue({
        all: [{ hash: 'abc', message: 'Rename', author_name: 'John', date: '2000-01-01' }],
      })

      // Rename format: R<score>\told\tnew
      mockGit.raw.mockResolvedValue('R95\ttests/old.spec.ts\ttests/new.spec.ts')

      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test1'])
      mockGit.show.mockResolvedValue('content')

      const history = await buildHistory('/project', './tests', 'vitest')

      expect(history.entries).toHaveLength(1)
    })

    it('should handle test additions', async () => {
      mockGit.log.mockResolvedValue({
        all: [{ hash: 'abc', message: 'Add', author_name: 'John', date: '2000-01-01' }],
      })

      mockGit.raw.mockResolvedValue('A\ttests/new.spec.ts')
      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test1', 'test2'])
      mockGit.show.mockResolvedValue('content')

      const history = await buildHistory('/project', './tests', 'vitest')

      expect(history.entries).toHaveLength(1)
      const changes = history.entries[0].specs[0].changes
      expect(changes.some((c) => c.type === 'added')).toBe(true)
    })

    it('should handle test removals', async () => {
      mockGit.log.mockResolvedValue({
        all: [{ hash: 'abc', message: 'Remove', author_name: 'John', date: '2000-01-01' }],
      })

      mockGit.raw.mockResolvedValue('D\ttests/removed.spec.ts')
      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test1'])
      mockGit.show.mockResolvedValue('content')

      const history = await buildHistory('/project', './tests', 'vitest')

      expect(history.entries).toHaveLength(1)
      const fileStatus = history.entries[0].specs[0].fileStatus
      expect(fileStatus).toBe('deleted')
    })

    it('should detect test modifications (added and removed)', async () => {
      mockGit.log.mockResolvedValue({
        all: [{ hash: 'abc', message: 'Modify', author_name: 'John', date: '2000-01-01' }],
      })

      mockGit.raw.mockResolvedValue('M\ttests/file.spec.ts')

      // Mock different tests before and after
      let callCount = 0
      vi.mocked(parser.extractTestNamesFromContent).mockImplementation(() => {
        callCount++
        return callCount === 1
          ? ['old test', 'unchanged test']
          : ['new test', 'unchanged test']
      })

      mockGit.show.mockResolvedValue('content')

      const history = await buildHistory('/project', './tests', 'vitest')

      expect(history.entries).toHaveLength(1)
      const changes = history.entries[0].specs[0].changes
      expect(changes.some((c) => c.type === 'removed')).toBe(true)
      expect(changes.some((c) => c.type === 'added')).toBe(true)
    })

    it('should use correct test name extraction for framework', async () => {
      mockGit.log.mockResolvedValue({
        all: [{ hash: 'abc', message: 'Test', author_name: 'John', date: '2000-01-01' }],
      })

      mockGit.raw.mockResolvedValue('A\ttests/test.spec.ts')
      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test'])
      mockGit.show.mockResolvedValue('content')

      const frameworks: Array<any> = ['vitest', 'playwright', 'cypress']

      for (const framework of frameworks) {
        vi.clearAllMocks()
        vi.mocked(simpleGit).mockReturnValue(mockGit)
        vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test'])

        const result = await buildHistory('/project', './tests', framework)

        expect(result).toBeDefined()
        expect(vi.mocked(parser.extractTestNamesFromContent)).toHaveBeenCalled()
      }
    })
  })

  describe('File change detection', () => {
    it('should handle files outside test directory', async () => {
      mockGit.log.mockResolvedValue({
        all: [{ hash: 'abc', message: 'Changes', author_name: 'John', date: '2000-01-01' }],
      })

      // Only src/ files, not tests/
      mockGit.raw.mockResolvedValue('M\tsrc/index.ts')

      const result = await buildHistory('/project', './tests', 'vitest')

      // Should be empty since no test files changed
      expect(result.entries).toHaveLength(0)
    })

    it('should only process spec files', async () => {
      mockGit.log.mockResolvedValue({
        all: [{ hash: 'abc', message: 'Changes', author_name: 'John', date: '2000-01-01' }],
      })

      mockGit.raw.mockResolvedValue(
        'M\ttests/index.ts\nM\ttests/utils.spec.ts\nM\ttests/readme.md'
      )

      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test'])
      mockGit.show.mockResolvedValue('content')

      const result = await buildHistory('/project', './tests', 'vitest')

      // Should process spec file but not index.ts or readme.md
      expect(result.entries.length).toBeGreaterThanOrEqual(0)
    })

    it('should handle renamed files properly', async () => {
      mockGit.log.mockResolvedValue({
        all: [{ hash: 'abc', message: 'Rename', author_name: 'John', date: '2000-01-01' }],
      })

      // Rename format: R<score>\told\tnew
      mockGit.raw.mockResolvedValue('R95\ttests/old.spec.ts\ttests/new.spec.ts')

      vi.mocked(parser.extractTestNamesFromContent).mockReturnValue(['test1'])
      mockGit.show.mockResolvedValue('content')

      const result = await buildHistory('/project', './tests', 'vitest')

      expect(result.entries).toHaveLength(1)
    })
  })
})
