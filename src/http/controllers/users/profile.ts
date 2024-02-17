
import { makeGetUserPorfileService } from "@/services/factories/make-get-user-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {

  const getUserProfile = makeGetUserPorfileService()

  const { user } = await getUserProfile.execute({
    user_id: request.user.sub,
  })


  return reply.status(201).send({
    ...user,
    password_hash: undefined,
  })
}