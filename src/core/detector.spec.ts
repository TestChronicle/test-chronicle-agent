import { describe, it, expect } from 'vitest'
import { detectFramework } from './index'
import path from 'path'

describe('Framework Detection', () => {
  it('should detect a framework for the current project', () => {
    const result = detectFramework(path.resolve(__dirname, '..', '..'))
    expect(result.framework).toBeDefined()
    expect(result.testDir).toBeDefined()
    expect(result.confidence).toBeDefined()
    expect(['high', 'medium', 'low']).toContain(result.confidence)
  })

  it('should identify a test directory', () => {
    const result = detectFramework(path.resolve(__dirname, '..', '..'))
    expect(result.testDir).toBeTruthy()
    expect(['./src', './tests', 'src', 'tests']).toContain(result.testDir)
  })

  it('should return a valid framework type', () => {
    const result = detectFramework(path.resolve(__dirname, '..', '..'))
    const validFrameworks = ['playwright', 'cypress', 'testng', 'junit', 'vitest', 'unknown']
    expect(validFrameworks).toContain(result.framework)
  })

  it('should have high confidence for recognized frameworks', () => {
    const result = detectFramework(path.resolve(__dirname, '..', '..'))
    if (result.framework !== 'unknown') {
      expect(result.confidence).toBe('high')
    }
  })

  it('should return consistent results on multiple calls', () => {
    const projectPath = path.resolve(__dirname, '..', '..')
    const result1 = detectFramework(projectPath)
    const result2 = detectFramework(projectPath)
    
    expect(result1.framework).toBe(result2.framework)
    expect(result1.testDir).toBe(result2.testDir)
    expect(result1.confidence).toBe(result2.confidence)
  })

  it('should handle vitest framework detection', () => {
    const result = detectFramework(path.resolve(__dirname, '..', '..'))
    // This project uses vitest based on the vitest.config.ts
    expect(result.framework).toBe('vitest')
  })
})
