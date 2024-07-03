
import { makeGetDashboardDataService } from "@/services/factories/dashboard/make-get-data-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getDashboardData(request: FastifyRequest, reply: FastifyReply) {

  const user_id = request.user.sub

  const getDashboardDataService = makeGetDashboardDataService()

  const data = await getDashboardDataService.execute({ user_id })

  return reply.status(200).send(data)
}