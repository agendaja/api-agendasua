import { FastifyInstance } from "fastify"


export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async (_, reply) => {
    return reply.send({ status: 'ok' })
  })
}