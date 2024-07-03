import { makeGetUserPorfileService } from "@/services/factories/users/make-get-user-profile-service";
import { sanitizeUser } from "@/utils/sanitizeUser";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAuthUser(request: FastifyRequest, reply: FastifyReply) {

  const getUserProfile = makeGetUserPorfileService()

  const { user } = await getUserProfile.execute({
    user_id: request.user.sub,
  })

  if (!user) {
    return reply.status(404)
  }

  const parsedUser = sanitizeUser(user)

  return reply.status(200).send({
    ...parsedUser
  })
}