import { config } from 'dotenv'
import { syncProject, SyncOptions } from './sync'

// Load environment variables from .env.local
config({ path: '.env.local' })

/**
 * CLI entry point for test-chronicle agent
 * 
 * Environment variables (set by GitHub Action or user):
 * - CHRONICLE_PROJECT_ID: Project ID
 * - CHRONICLE_API_KEY: API key
 * - CHRONICLE_DASHBOARD_URL: Dashboard URL (optional, default: http://localhost:3000)
 */
async function main() {
  try {
    const projectId = process.env.CHRONICLE_PROJECT_ID
    const apiKey = process.env.CHRONICLE_API_KEY
    const dashboardUrl = process.env.CHRONICLE_DASHBOARD_URL || 'http://localhost:3000'

    if (!projectId || !apiKey) {
      console.error('Error: CHRONICLE_PROJECT_ID and CHRONICLE_API_KEY are required')
      process.exit(1)
    }

    const options: SyncOptions = {
      projectId,
      apiKey,
      dashboardUrl,
    }

    await syncProject(options)
    process.exit(0)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Fatal error:', message)
    process.exit(1)
  }
}

// Export for use as a module
export { main as cli }

// Only run if this is the main module
if (require.main === module) {
  main()
}
