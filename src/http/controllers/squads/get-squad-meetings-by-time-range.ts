import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetSquadMeetingsByTimeRangeService } from "@/services/factories/squads/make-get-squad-meetings-by-time-range-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getSquadMeetingsByTimeRange(request: FastifyRequest, reply: FastifyReply) {

  const createBodySchema = z.object({
    weekDay: z.enum(["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"]),
    startTime: z.string(),
    endTime: z.string(),
  })

  const createParamsSchema = z.object({
    squad_id: z.string(),
  })

  const { squad_id } = createParamsSchema.parse(request.params)

  const {
    weekDay,
    startTime,
    endTime
  } = createBodySchema.parse(request.body)


  const getSquadMeetingsByTimeRange = makeGetSquadMeetingsByTimeRangeService()


  try {

    const meetings = await getSquadMeetingsByTimeRange.execute({
      squad_id,
      weekDay,
      startTime,
      endTime
    })

    return reply.status(201).send(meetings)

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

}