import Queue from 'bull'
import redisConfig from '@/config/redis'

import * as jobs from '../jobs'
import { MeetingTypes } from '@/@types/meetings'

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle
}))

export default {
  queues,
  add(name: string, data: MeetingTypes.MeetingQueue) {
    const queue = this.queues.find(queue => queue.name === name)

    return queue?.bull.add(data)
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)

      queue.bull.on('error', (error) => {
        console.log('ERRO NA FILA', error)
      })

      queue.bull.on('failed', (job, error) => {
        console.log('FALHOU A FILA', queue.name, job.data)
        console.log('ERRO', error)
      })

      queue.bull.on('complete', (job) => {
        console.log('SUCESSO', queue.name, job.data)
      })
    })
  }
}



