/**
 * GitHub Action entrypoint for Test Chronicle Agent
 * Runs the sync command with inputs provided by GitHub Actions
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function run() {
  try {
    // Get inputs from GitHub Actions
    const apiKey = process.env.INPUT_API_KEY
    const projectId = process.env.INPUT_PROJECT_ID

    if (!apiKey) {
      throw new Error('api-key input is required')
    }

    if (!projectId) {
      throw new Error('project-id input is required')
    }

    console.log('🚀 Starting Test Chronicle sync...')
    console.log(`📦 Project ID: ${projectId}`)

    // Run sync command with environment variables
    const { stdout, stderr } = await execAsync('node ./dist/cli.js sync', {
      env: {
        ...process.env,
        CHRONICLE_API_KEY: apiKey,
        CHRONICLE_PROJECT_ID: projectId,
      },
    })

    if (stdout) {
      console.log(stdout)
    }

    if (stderr) {
      console.warn(stderr)
    }

    console.log('✅ Sync completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Sync failed:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

run()
