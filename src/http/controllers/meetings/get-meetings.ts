import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetMeetingsService } from "@/services/factories/meetings/make-get-meetings-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getMeetings(request: FastifyRequest, reply: FastifyReply) {

  const user_id = request.user.sub

  const getMeetingsService = makeGetMeetingsService()

  try {
    const meetings = await getMeetingsService.execute({ user_id })

    return reply.status(200).send(meetings)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

}