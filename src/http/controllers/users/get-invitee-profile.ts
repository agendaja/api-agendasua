
import { makeGetInviteePorfileService } from "@/services/factories/make-get-invitee-profile-service copy";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getInviteProfile(request: FastifyRequest, reply: FastifyReply) {

  const getInviteeProfile = makeGetInviteePorfileService()

  const { user } = await getInviteeProfile.execute({
    email: request.user.email,
    squad_id: request.user.squad_id,
  })


  return reply.status(200).send(user)
}