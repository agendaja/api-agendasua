import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetSellerWorkTimeService } from "@/services/factories/seller/make-get-seller-work-time-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getSellerWorktime(request: FastifyRequest, reply: FastifyReply) {

  const registerParamsSchema = z.object({
    squad_id: z.string()
  })

  const { squad_id } = registerParamsSchema.parse(request.params)

  const user_id = request.user.sub

  try {
    const getSellerWorkTimeService = makeGetSellerWorkTimeService()

    const { work_times } = await getSellerWorkTimeService.execute({
      squad_id,
      user_id
    })

    return reply.status(200).send(work_times)

  } catch (error) {

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }


}