
import { makeDeleteIntegrationService } from "@/services/factories/integrations/make-delete-integration-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteIntegration(request: FastifyRequest, reply: FastifyReply) {

  const registerParamsSchema = z.object({
    integration_id: z.string(),
  })

  const { integration_id } = registerParamsSchema.parse(request.params)

  const user_id = request.user.sub

  const deleteIntegration = makeDeleteIntegrationService()

  await deleteIntegration.execute({ integration_id, user_id })

  return reply.status(200).send()

}