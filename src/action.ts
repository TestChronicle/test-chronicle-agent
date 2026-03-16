/**
 * GitHub Action entrypoint for Test Chronicle Agent
 * Runs the sync command with inputs provided by GitHub Actions
 */

import { execSync } from 'child_process'
import * as path from 'path'

async function run() {
  try {
    // Get inputs from GitHub Actions
    // GitHub automatically sets INPUT_<INPUT_NAME> for each input (with hyphens preserved)
    const apiKey = process.env['INPUT_API-KEY']
    const projectId = process.env['INPUT_PROJECT-ID']
    const dashboardUrl = process.env['INPUT_DASHBOARD-URL']
    const fullHistory = process.env['INPUT_FULL-HISTORY'] === 'true'

    if (!apiKey) {
      throw new Error('api-key input is required')
    }

    if (!projectId) {
      throw new Error('project-id input is required')
    }

    console.log('🚀 Starting Test Chronicle Agent...')
    console.log(`📦 Project ID: ${projectId}`)

    // Build environment variables for the CLI
    const env: Record<string, string> = {
      ...process.env as Record<string, string>,
      CHRONICLE_API_KEY: apiKey,
      CHRONICLE_PROJECT_ID: projectId,
    }

    if (dashboardUrl) {
      env.CHRONICLE_DASHBOARD_URL = dashboardUrl
    }

    // Build sync command with optional flags
    let syncCommand = 'sync'
    if (fullHistory) {
      syncCommand += ' --full-history'
    }

    // Run sync command using the bundled CLI
    try {
      const cliPath = path.join(__dirname, 'cli-bundle', 'index.js')
      execSync(`node ${cliPath} ${syncCommand}`, {
        env,
        stdio: 'inherit',
      })
    } catch (syncError) {
      // execSync throws on non-zero exit codes
      throw new Error(`Sync command failed: ${syncError instanceof Error ? syncError.message : String(syncError)}`)
    }

    console.log('✅ Test Chronicle Agent sync completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Test Chronicle Agent failed:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

run()
