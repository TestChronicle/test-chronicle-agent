import { Command } from 'commander'
import { syncCommand } from './commands/sync'
import { initCommand } from './commands/init'

export const cli = new Command()
  .name('test-chronicle-agent')
  .description('CLI agent for syncing test data to test-chronicle dashboard')
  .version('0.1.0')

cli.addCommand(initCommand)
cli.addCommand(syncCommand)

// Main execution
async function main() {
  try {
    await cli.parseAsync(process.argv)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

// Only run if this is the main module
if (require.main === module) {
  main()
}
