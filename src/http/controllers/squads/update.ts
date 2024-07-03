import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeUpdateSquadService } from "@/services/factories/squads/make-update-squad-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {

  const createBodySchema = z.object({
    background_color: z.string().optional(),
    description: z.string().optional(),
    meetings_duration: z.number().
      min(0.5, "A duração mínima de uma reunião é de 30 minutos")
      .max(2, "A duração máxima de uma reunião é de 120 minutos")
      .optional(),
    name: z.string().optional(),
    theme_color: z.string().optional(),
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
    ).optional(),
  })

  const createParamsSchema = z.object({
    squad_id: z.string(),
  })

  const { squad_id } = createParamsSchema.parse(request.params)

  const {
    background_color,
    description,
    meetings_duration,
    name,
    theme_color,
    weekly_hours,
  } = createBodySchema.parse(request.body)

  const updateSquadService = makeUpdateSquadService()

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
    await updateSquadService.execute({
      background_color,
      description,
      meetings_duration,
      name,
      theme_color,
      weekly_hours: parsedWeeklyHours,
      squad_id
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}