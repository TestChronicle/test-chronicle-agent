import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { syncToDashboard } from './sync-client'

// Mock fetch globally
global.fetch = vi.fn()

describe('Sync Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(global.fetch as any).mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('syncToDashboard()', () => {
    it('should successfully sync data to dashboard', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: '2024-01-15T10:30:00Z',
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await syncToDashboard('http://localhost:3000', 'api-key-123', {
        projectId: 'project-123',
        specs: [],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      })

      expect(result.success).toBe(true)
      expect(result.projectId).toBe('project-123')
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('should construct correct API URL', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await syncToDashboard('http://localhost:3000', 'key', {
        projectId: 'project-123',
        specs: [],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      })

      const callArgs = (global.fetch as any).mock.calls[0]
      expect(callArgs[0]).toContain('/api/projects/project-123/sync')
    })

    it('should include Authorization header with Bearer token', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await syncToDashboard('http://localhost:3000', 'my-api-key', {
        projectId: 'project-123',
        specs: [],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      })

      const callArgs = (global.fetch as any).mock.calls[0]
      const headers = callArgs[1].headers

      expect(headers['Authorization']).toBe('Bearer my-api-key')
    })

    it('should set Content-Type header to application/json', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await syncToDashboard('http://localhost:3000', 'key', {
        projectId: 'project-123',
        specs: [],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      })

      const callArgs = (global.fetch as any).mock.calls[0]
      const headers = callArgs[1].headers

      expect(headers['Content-Type']).toBe('application/json')
    })

    it('should use POST method', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await syncToDashboard('http://localhost:3000', 'key', {
        projectId: 'project-123',
        specs: [],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      })

      const callArgs = (global.fetch as any).mock.calls[0]

      expect(callArgs[1].method).toBe('POST')
    })

    it('should send payload as JSON body', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const payload = {
        projectId: 'project-123',
        specs: [{ path: 'test.spec.ts' }],
        history: [{ commitHash: 'abc123' }],
        stats: { totalTests: 45 },
        timestamp: '2024-01-15T10:30:00Z',
      }

      await syncToDashboard('http://localhost:3000', 'key', payload as any)

      const callArgs = (global.fetch as any).mock.calls[0]
      const bodyString = callArgs[1].body
      const bodyObject = JSON.parse(bodyString)

      expect(bodyObject).toEqual(payload)
    })

    it('should throw error on 4xx response', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: vi.fn().mockResolvedValue('Invalid API key'),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await expect(
        syncToDashboard('http://localhost:3000', 'bad-key', {
          projectId: 'project-123',
          specs: [],
          history: [],
          stats: {},
          timestamp: new Date().toISOString(),
        })
      ).rejects.toThrow('401')
    })

    it('should throw error on 5xx response', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: vi.fn().mockResolvedValue('Database error'),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await expect(
        syncToDashboard('http://localhost:3000', 'key', {
          projectId: 'project-123',
          specs: [],
          history: [],
          stats: {},
          timestamp: new Date().toISOString(),
        })
      ).rejects.toThrow('500')
    })

    it('should include error response body in error message', async () => {
      const errorMessage = 'Project not found'
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: vi.fn().mockResolvedValue(errorMessage),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      try {
        await syncToDashboard('http://localhost:3000', 'key', {
          projectId: 'nonexistent',
          specs: [],
          history: [],
          stats: {},
          timestamp: new Date().toISOString(),
        })
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toContain(errorMessage)
      }
    })

    it('should handle error body read errors gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: vi.fn().mockRejectedValue(new Error('Cannot read response')),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await expect(
        syncToDashboard('http://localhost:3000', 'key', {
          projectId: 'project-123',
          specs: [],
          history: [],
          stats: {},
          timestamp: new Date().toISOString(),
        })
      ).rejects.toThrow('500')
    })

    it('should handle network errors', async () => {
      ;(global.fetch as any).mockRejectedValue(new Error('Network error: ECONNREFUSED'))

      await expect(
        syncToDashboard('http://localhost:3000', 'key', {
          projectId: 'project-123',
          specs: [],
          history: [],
          stats: {},
          timestamp: new Date().toISOString(),
        })
      ).rejects.toThrow('Network error')
    })

    it('should return parsed JSON response', async () => {
      const expectedResponse = {
        success: true,
        projectId: 'project-123',
        synced_at: '2024-01-15T10:30:00Z',
      }

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(expectedResponse),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await syncToDashboard('http://localhost:3000', 'key', {
        projectId: 'project-123',
        specs: [],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      })

      expect(result).toEqual(expectedResponse)
    })

    it('should handle dashboard URL without trailing slash', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await syncToDashboard('http://localhost:3000', 'key', {
        projectId: 'project-123',
        specs: [],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      })

      const callUrl = (global.fetch as any).mock.calls[0][0]
      expect(callUrl).toContain('api/projects')
    })

    it('should handle dashboard URL with trailing slash', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await syncToDashboard('http://localhost:3000/', 'key', {
        projectId: 'project-123',
        specs: [],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      })

      // Should still work with trailing slash
      expect(global.fetch).toHaveBeenCalled()
    })

    it('should handle different dashboard URLs', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const urls = [
        'http://localhost:3000',
        'https://test-chronicle.vercel.app',
        'http://192.168.1.1:8080',
      ]

      for (const url of urls) {
        ;(global.fetch as any).mockClear()

        await syncToDashboard(url, 'key', {
          projectId: 'project-123',
          specs: [],
          history: [],
          stats: {},
          timestamp: new Date().toISOString(),
        })

        expect(global.fetch).toHaveBeenCalled()
      }
    })

    it('should handle empty specs and history', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await syncToDashboard('http://localhost:3000', 'key', {
        projectId: 'project-123',
        specs: [],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      })

      expect(result.success).toBe(true)
    })

    it('should handle large payloads', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      // Create a large payload
      const largeSpecs = Array.from({ length: 1000 }, (_, i) => ({
        filePath: `test${i}.spec.ts`,
        framework: 'vitest',
        tests: Array.from({ length: 10 }, (_, j) => ({
          name: `test${j}`,
          lineNumber: j,
          tags: [],
        })),
      }))

      const result = await syncToDashboard('http://localhost:3000', 'key', {
        projectId: 'project-123',
        specs: largeSpecs,
        history: [],
        stats: { totalTests: 10000 },
        timestamp: new Date().toISOString(),
      })

      expect(result.success).toBe(true)
    })

    it('should preserve special characters in payload', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          projectId: 'project-123',
          synced_at: new Date().toISOString(),
        }),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const payload = {
        projectId: 'project-123',
        specs: [
          {
            filePath: 'test-special-chars.spec.ts',
            framework: 'vitest',
            tests: [
              {
                name: 'should handle "quotes" and \'apostrophes\'',
                lineNumber: 10,
                tags: [],
              },
            ],
          },
        ],
        history: [],
        stats: {},
        timestamp: new Date().toISOString(),
      }

      await syncToDashboard('http://localhost:3000', 'key', payload as any)

      const callArgs = (global.fetch as any).mock.calls[0]
      const bodyString = callArgs[1].body
      const bodyObject = JSON.parse(bodyString)

      expect(bodyObject.specs[0].tests[0].name).toContain('quotes')
    })
  })

  describe('Error handling edge cases', () => {
    it('should handle empty error response body', async () => {
      const mockResponse = {
        ok: false,
        status: 502,
        statusText: 'Bad Gateway',
        text: vi.fn().mockResolvedValue(''),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await expect(
        syncToDashboard('http://localhost:3000', 'key', {
          projectId: 'project-123',
          specs: [],
          history: [],
          stats: {},
          timestamp: new Date().toISOString(),
        })
      ).rejects.toThrow()
    })

    it('should handle malformed JSON in response', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new SyntaxError('Unexpected token')),
      }

      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await expect(
        syncToDashboard('http://localhost:3000', 'key', {
          projectId: 'project-123',
          specs: [],
          history: [],
          stats: {},
          timestamp: new Date().toISOString(),
        })
      ).rejects.toThrow()
    })

    it('should handle connection timeout', async () => {
      const timeoutError = new Error('Request timeout')
      ;(global.fetch as any).mockRejectedValue(timeoutError)

      await expect(
        syncToDashboard('http://localhost:3000', 'key', {
          projectId: 'project-123',
          specs: [],
          history: [],
          stats: {},
          timestamp: new Date().toISOString(),
        })
      ).rejects.toThrow('Request timeout')
    })
  })
})
