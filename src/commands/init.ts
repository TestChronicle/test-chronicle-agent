import { Command } from 'commander'
import chalk from 'chalk'
import dotenv from 'dotenv'
import { detectFramework } from '../core'
import path from 'path'
import fs from 'fs'

dotenv.config()

export const initCommand = new Command('init')
  .description('Initialize a new test project')
  .requiredOption('--path <path>', 'Project path')
  .option('--name <name>', 'Project display name (defaults to directory name)')
  .option('--dashboard-url <url>', 'Dashboard URL')
  .action(async (options) => {
    try {
      const projectPath = path.resolve(options.path)
      
      // Load .env.local from project directory
      const envLocalPath = path.join(projectPath, '.env.local')
      if (fs.existsSync(envLocalPath)) {
        dotenv.config({ path: envLocalPath })
      }
      
      const dashboardUrl = options.dashboardUrl || process.env.CHRONICLE_DASHBOARD_URL || 'http://localhost:3000'
      const apiKey = process.env.CHRONICLE_API_KEY

      // Validate project path exists
      if (!fs.existsSync(projectPath)) {
        console.error(chalk.red(`Error: Project path does not exist: ${projectPath}`))
        process.exit(1)
      }

      // Validate API key
      if (!apiKey) {
        console.error(chalk.red('Error: Missing API key'))
        console.log(chalk.yellow('\nSet up your .env.local file:'))
        console.log(chalk.gray('  1. Create .env.local in your project directory'))
        console.log(chalk.gray('  2. Add your API key from registration:'))
        console.log(chalk.white('     CHRONICLE_API_KEY=<your-api-key>'))
        console.log(chalk.gray('  3. Optional - set dashboard URL:'))
        console.log(chalk.white('     CHRONICLE_DASHBOARD_URL=http://localhost:3000'))
        console.log(chalk.gray('\nOr visit http://localhost:3000/auth/register to create an account'))
        process.exit(1)
      }

      if (!dashboardUrl) {
        console.error(chalk.red('Error: Missing dashboard URL'))
        console.log(chalk.yellow('Set CHRONICLE_DASHBOARD_URL env var in .env.local or use --dashboard-url'))
        process.exit(1)
      }

      console.log(chalk.blue('🔍 Detecting framework...'))
      const detection = detectFramework(projectPath)
      console.log(chalk.green(`✓ Detected framework: ${detection.framework}`))
      console.log(chalk.gray(`  Test directory: ${detection.testDir}`))

      // Use provided name or derive from directory
      const projectName = options.name || path.basename(projectPath)

      console.log(chalk.blue('📝 Creating project on dashboard...'))
      console.log(chalk.gray(`  Endpoint: ${dashboardUrl}/api/projects`))
      console.log(chalk.gray(`  Project name: ${projectName}`))

      const projectData = {
        name: projectName,
        path: projectPath,
        framework: detection.framework,
      }

      console.log(chalk.gray(`  Sending request...`))

      let response
      try {
        response = await fetch(`${dashboardUrl}/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
          body: JSON.stringify(projectData),
        })
      } catch (fetchError) {
        console.error(chalk.red('Network error - failed to reach dashboard:'))
        console.error(chalk.red(fetchError instanceof Error ? fetchError.message : String(fetchError)))
        console.log()
        console.log(chalk.yellow('Troubleshooting tips:'))
        console.log(chalk.gray('- Check that the dashboard is running'))
        console.log(chalk.gray(`- Verify the URL is correct: ${dashboardUrl}`))
        console.log(chalk.gray('- Try with http:// instead of https:// if applicable'))
        process.exit(1)
      }

      console.log(chalk.gray(`  Response status: ${response.status}`))

      if (!response.ok) {
        let errorMessage = `Failed to create project (${response.status} ${response.statusText})`
        let responseBody = ''
        try {
          responseBody = await response.text()
        } catch {
          /* empty */
        }

        if (responseBody) {
          errorMessage += `: ${responseBody}`
        }

        console.error(chalk.red('Error:'), errorMessage)
        process.exit(1)
      }

      const result = (await response.json()) as { id: string; name: string }
      console.log(chalk.green(`✓ Project created successfully!`))
      console.log(chalk.gray(`  Project ID: ${result.id}`))
      console.log(chalk.gray(`  Project name: ${result.name}`))

      // Provide next steps
      console.log()
      console.log(chalk.cyan('✨ Next steps:'))
      console.log(chalk.gray('  1. Add to .env.local:'))
      console.log(chalk.white(`     CHRONICLE_PROJECT_ID=${result.id}`))
      console.log(chalk.gray('  2. Run sync command:'))
      console.log(chalk.white(`     test-chronicle-agent sync`))
    } catch (error) {
      console.error(chalk.red('Error during init:'))
      if (error instanceof Error) {
        console.error(chalk.red(`  ${error.message}`))
      } else {
        console.error(chalk.red(`  ${String(error)}`))
      }
      process.exit(1)
    }
  })
