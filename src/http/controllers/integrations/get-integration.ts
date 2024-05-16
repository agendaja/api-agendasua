
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetIntegrationService } from "@/services/factories/make-get-integration-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getIntegration(request: FastifyRequest, reply: FastifyReply) {

  const bodySchema = z.object({
    email: z.string().email(),
    name: z.enum(['google', 'zoom'])
  })

  const { email, name } = bodySchema.parse(request.body)


  const getIntegration = makeGetIntegrationService()


  try {
    const integration = await getIntegration.execute({ email, name })

    return reply.status(200).send({ integration })

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

}