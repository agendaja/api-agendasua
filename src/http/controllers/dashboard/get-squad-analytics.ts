
import { makeGetSquadAnalyticsService } from "@/services/factories/dashboard/make-get-squad-analytics-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getSquadAnalytics(request: FastifyRequest, reply: FastifyReply) {

  const createQuerySchema = z.object({
    squad_id: z.string()
  })

  const { squad_id } = createQuerySchema.parse(request.params)

  const getSquadAnalyticsService = makeGetSquadAnalyticsService()

  const data = await getSquadAnalyticsService.execute({ squad_id })

  return reply.status(200).send(data)
}