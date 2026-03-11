import { describe, it, expect } from 'vitest'
import { detectFramework } from './index'
import path from 'path'

describe('Framework Detection', () => {
  it('should detect a framework for the current project', () => {
    const result = detectFramework(path.resolve(__dirname, '..', '..'))
    expect(result.framework).toBeDefined()
    expect(result.testDir).toBeDefined()
  })

  it('should identify a test directory', () => {
    const result = detectFramework(path.resolve(__dirname, '..', '..'))
    expect(result.testDir).toBeTruthy()
    expect(['./src', './tests', 'src', 'tests']).toContain(result.testDir)
  })
})
