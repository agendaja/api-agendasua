import { FastifyInstance } from "fastify"


export async function healthRoutes(app: FastifyInstance) {
  app.get('/', async (_, reply) => {
    return reply.status(200).send({ ok: true })
  })
}