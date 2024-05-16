import { makeGetUserPorfileService } from "@/services/factories/make-get-user-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAuthUser(request: FastifyRequest, reply: FastifyReply) {

  const getUserProfile = makeGetUserPorfileService()

  const { user } = await getUserProfile.execute({
    user_id: request.user.sub,
  })

  if (!user) {
    return reply.status(404)
  }

  return reply.status(200).send({
    name: user.name,
    email: user.email,
    integration: user.integration
  })
}