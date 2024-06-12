
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetInviteePorfileService } from "@/services/factories/make-get-invitee-profile-service"
import { FastifyReply, FastifyRequest } from "fastify";

export async function getInviteProfile(request: FastifyRequest, reply: FastifyReply) {

  const getInviteeProfile = makeGetInviteePorfileService()

  try {
    const { user } = await getInviteeProfile.execute({
      email: request.user.email,
      squad_id: request.user.squad_id,
    })

    return reply.status(200).send(user)

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}