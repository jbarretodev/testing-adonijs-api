import Scheduler from '@ioc:Adonis/Addons/Scheduler'

Scheduler.command('inspire').everyFiveSeconds()

Scheduler.call(() => {
  console.log('Pruge DB!')
}).weekly()
