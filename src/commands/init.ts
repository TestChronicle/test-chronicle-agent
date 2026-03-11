import { Command } from 'commander'
import chalk from 'chalk'
import dotenv from 'dotenv'
import { detectFramework } from '../core'
import path from 'path'
import fs from 'fs'

dotenv.config({ debug: false })

export const initCommand = new Command('init')
  .description('Initialize a new test project')
  .option('--path <path>', 'Project path (defaults to current directory)')
  .option('--name <name>', 'Project display name (defaults to directory name)')
  .option('--dashboard-url <url>', 'Dashboard URL')
  .action(async (options) => {
    try {
      const projectPath = path.resolve(options.path || process.cwd())
      
      // Load .env.local from project directory
      const envLocalPath = path.join(projectPath, '.env.local')
      if (fs.existsSync(envLocalPath)) {
        dotenv.config({ path: envLocalPath, debug: false })
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

      const detection = detectFramework(projectPath)
      const projectName = options.name || path.basename(projectPath)

      console.log()
      console.log(chalk.blue('📝 Initializing project'))
      console.log(chalk.gray(`  Framework: ${detection.framework}`))
      console.log(chalk.gray(`  Name: ${projectName}`))
      console.log(chalk.gray(`  Test directory: ${detection.testDir}`))

      const projectData = {
        name: projectName,
        path: projectPath,
        framework: detection.framework,
      }

      process.stdout.write(chalk.gray('  Creating project... '))

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
      console.log(chalk.green('done'))
      console.log()
      console.log(chalk.green('✓ Project created successfully!'))
      console.log()
      console.log(chalk.white(`Project ID: ${chalk.bold(result.id)}`))
      console.log()
      console.log(chalk.gray('Next: Add to .env.local and run sync'))
      console.log(`  ${chalk.white(`CHRONICLE_PROJECT_ID=${result.id}`)}`)
      console.log(`  ${chalk.white('test-chronicle-agent sync')}`)
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
