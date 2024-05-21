import { makeGetDayFreeMeetingsTimesService } from "@/services/factories/make-get-day-free-meetings-times-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getDayFreeTimes(request: FastifyRequest, reply: FastifyReply) {

  const createQuerySchema = z.object({
    squad_id: z.string(),
    date: z.string(),
  })

  const { squad_id, date } = createQuerySchema.parse(request.params)

  const getDayFreeMeetingsTime = makeGetDayFreeMeetingsTimesService()

  const parsedDate = new Date(Number(date))

  const availableMeetingTimes = await getDayFreeMeetingsTime.execute({
    squad_id,
    date: parsedDate,
  })

  return reply.status(200).send(availableMeetingTimes)
}