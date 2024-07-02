import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeUpdateSellerWorkTimeService } from "@/services/factories/seller/make-update-work-time-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateSellerWorktime(request: FastifyRequest, reply: FastifyReply) {

  const registerParamsSchema = z.object({
    squad_id: z.string()
  })

  const registerBodySchema = z.object({
    weekly_hours: z.array(
      z.object({
        name: z.string(),
        available: z.boolean(),
        hours: z.array(
          z.object({
            start_hour: z.string().nullable(),
            end_hour: z.string().nullable()
          })
        )
      })
    ),
  })

  const { squad_id } = registerParamsSchema.parse(request.params)

  const { weekly_hours } = registerBodySchema.parse(request.body)

  const user_id = request.user.sub

  const parsedWeeklyHours = weekly_hours?.map(weekly_hours => ({
    available: weekly_hours.available,
    name: weekly_hours.name,
    hours: weekly_hours.hours
      .map(hour =>
        hour.start_hour && hour.end_hour
          ? {
            start_hour: hour.start_hour,
            end_hour: hour.end_hour
          }
          : { start_hour: '', end_hour: '' } // Replace null with default values
      )
      .filter(val => val.start_hour !== '' && val.end_hour !== '') // Filter out default values
  }))

  try {
    const updateSellerWorktimeService = makeUpdateSellerWorkTimeService()

    await updateSellerWorktimeService.execute({
      user_id,
      squad_id,
      weekly_hours: parsedWeeklyHours
    })

    return reply.status(200).send()

  } catch (error) {

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }


}