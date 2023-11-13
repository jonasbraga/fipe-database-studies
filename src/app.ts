import { Command } from 'commander'
import { processFipe } from './controller'

const program = new Command()

program
  .command('initProcess')
  .description('Download data from FIPE and saves in database')
  .action(async () => {
    await processFipe()
  })

program.parse(process.argv)

/* console.log('Enter a command:')

process.stdin.on('data', async (input) => {
  const command = input.toString().toUpperCase().replace('\n', '')

  if (command === 'INIT_PROCESS') {
    console.time('Process')
    await processFipe()
    console.timeEnd('Process')
    console.log('Process finished.')
  } else {
    console.log('Invalid command.')
  }
})
 */
