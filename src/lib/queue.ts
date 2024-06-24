import Queue from 'bull'
import redisConfig from '@/config/redis'

import CreateGoogleEvent from '@/jobs/CreateGoogleEvent'

const GoogleEventQueue = new Queue(CreateGoogleEvent.key, 'redis://red-cpqsm76ehbks738h3hj0:6379')

GoogleEventQueue.on('error', (error) => {
  console.log('FALHOU A FILA', error)
})

GoogleEventQueue.on('failed', (job, error) => {
  console.log('FALHOU A FILA', error)
})

GoogleEventQueue.on('failed', (job, error) => {
  console.log('FALHOU A FILA', error)
})


export default GoogleEventQueue

