import { Command } from 'commander'
import chalk from 'chalk'
import dotenv from 'dotenv'
import { detectFramework } from '../core'
import { parseAllSpecs } from '../core'
import { buildHistory } from '../git'
import { syncToDashboard } from '../sync-client'
import { TestChange } from '../types'
import path from 'path'
import fs from 'fs'

dotenv.config({ debug: false })

// ─── Deduplication ────────────────────────────────────────────────────────────

/**
 * Deduplicates test changes using a composite key.
 * Removes duplicate entries that have the same (type, name, oldName) combination.
 */
function deduplicateChanges(changes: TestChange[]): TestChange[] {
  const seen = new Set<string>()
  const deduplicated: TestChange[] = []

  for (const change of changes) {
    // Create composite key: type:name:oldName (oldName is empty string if undefined)
    const key = `${change.type}:${change.name}:${change.oldName ?? ''}`

    if (!seen.has(key)) {
      seen.add(key)
      deduplicated.push(change)
    }
  }

  return deduplicated
}

export const syncCommand = new Command('sync')
  .description('Sync test data to dashboard')
  .option('--project-id <id>', 'Project ID from init')
  .option('--dashboard-url <url>', 'Dashboard URL')
  .option('--path <path>', 'Project path (defaults to current directory)')
  .action(async (options) => {
    try {
      const projectPath = options.path || process.cwd()
      
      // Load .env.local from project directory
      const envLocalPath = path.join(projectPath, '.env.local')
      if (fs.existsSync(envLocalPath)) {
        dotenv.config({ path: envLocalPath, debug: false })
      }
      
      // Get configuration from options or environment
      const projectId = options.projectId || process.env.CHRONICLE_PROJECT_ID
      const dashboardUrl = options.dashboardUrl || process.env.CHRONICLE_DASHBOARD_URL || 'http://localhost:3000'
      const apiKey = process.env.CHRONICLE_API_KEY

      // Validate required options
      if (!projectId) {
        console.error(chalk.red('Error: Missing project ID'))
        console.log(chalk.yellow('\nSet CHRONICLE_PROJECT_ID in .env.local:'))
        console.log(chalk.white('  CHRONICLE_PROJECT_ID=<id-from-init-command>'))
        console.log(chalk.gray('Or use --project-id flag'))
        process.exit(1)
      }

      if (!dashboardUrl) {
        console.error(chalk.red('Error: Missing dashboard URL'))
        console.log(chalk.yellow('Set CHRONICLE_DASHBOARD_URL in .env.local or use --dashboard-url'))
        process.exit(1)
      }

      if (!apiKey) {
        console.error(chalk.red('Error: Missing API key'))
        console.log(chalk.yellow('\nAdd your API key to .env.local:'))
        console.log(chalk.white('  CHRONICLE_API_KEY=<your-api-key>'))
        console.log(chalk.gray('Or visit http://localhost:3000/auth/settings to retrieve your key'))
        process.exit(1)
      }

      console.log(chalk.blue('🔍 Detecting framework...'))
      const detection = detectFramework(projectPath)
      console.log(chalk.green(`✓ Detected framework: ${detection.framework}`))
      console.log(chalk.gray(`  Test directory: ${detection.testDir}`))

      console.log(chalk.blue('📝 Parsing test specifications...'))
      const specs = parseAllSpecs(projectPath, detection.testDir, detection.framework)
      console.log(chalk.green(`✓ Found ${specs.length} spec files`))

      const totalTests = specs.reduce((sum, spec) => sum + spec.testCount, 0)
      console.log(chalk.gray(`  Total tests: ${totalTests}`))

      console.log(chalk.blue('📚 Building git history...'))
      const history = await buildHistory(projectPath, detection.testDir, detection.framework)
      console.log(chalk.green(`✓ Built history for ${history.length} commits`))

      // Compute stats
      const tags: Record<string, number> = {}
      specs.forEach((spec) => {
        spec.tests.forEach((test) => {
          test.tags?.forEach((tag) => {
            tags[tag.name] = (tags[tag.name] || 0) + 1
          })
        })
      })

      const stats = {
        totalSpecs: specs.length,
        totalTests,
        tags,
      }

      console.log()
      console.log(chalk.blue('📊 Summary'))
      console.log(chalk.gray(`  Specs: ${specs.length}`))
      console.log(chalk.gray(`  Tests: ${totalTests}`))
      console.log()

      console.log(chalk.blue('🚀 Syncing to dashboard...'))
      
      // Transform specs to match dashboard schema
      const transformedSpecs = specs.map((spec) => ({
        filePath: spec.path,
        framework: spec.framework,
        tests: spec.tests.map((test) => ({
          name: test.name,
          lineNumber: test.line,
          tags: test.tags.map((tag) => tag.name),
        })),
      }))

      // Transform history to match dashboard schema
      // Apply deduplication to each spec's changes before transforming
      const transformedHistory = history.map((entry) => ({
        commitHash: entry.commit.hash,
        commitMessage: entry.commit.message,
        author: entry.commit.author,
        commitDate: entry.commit.date,
        changes: entry.specs.flatMap((spec) => {
          // Deduplicate changes for this spec
          const deduplicatedChanges = deduplicateChanges(spec.changes)

          return deduplicatedChanges.map((change) => ({
            specFile: spec.specPath,
            testName: change.name,
            type: change.type === 'removed' ? 'deleted' : change.type,
            details: change.oldName ? { old_name: change.oldName } : undefined,
          }))
        }),
      }))

      const payload = {
        projectId,
        specs: transformedSpecs,
        history: transformedHistory,
        stats,
        timestamp: new Date().toISOString(),
      }

      await syncToDashboard(dashboardUrl, apiKey, payload)
      console.log(chalk.green('✓ Sync successful!'))
      console.log(chalk.gray(`  Synced ${specs.length} specs with ${totalTests} tests`))
    } catch (error) {
      console.error(chalk.red('Error during sync:'))
      if (error instanceof Error) {
        console.error(chalk.red(`  ${error.message}`))
      } else {
        console.error(chalk.red(`  ${String(error)}`))
      }
      process.exit(1)
    }
  })
