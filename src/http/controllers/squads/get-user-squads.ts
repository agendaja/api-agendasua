import { makeGetUserSquadsService } from "@/services/factories/make-get-user-squads-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserSquads(request: FastifyRequest, reply: FastifyReply) {

  const user_id = request.user.sub

  const getUserSquadsService = makeGetUserSquadsService()

  const squads = await getUserSquadsService.execute({ user_id })

  return reply.status(200).send(squads)
}