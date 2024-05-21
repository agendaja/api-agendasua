import { makeSquadService } from "@/services/factories/squads/make-squad-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {

  const createSquadBodySchema = z.object({
    background_color: z.string().nullable(),
    description: z.string(),
    meetings_duration: z.number().
      min(30, "A duração mínima de uma reunião é de 30 minutos")
      .max(120, "A duração máxima de uma reunião é de 120 minutos"),
    name: z.string(),
    theme_color: z.string().nullable(),
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

  const {
    background_color,
    description,
    meetings_duration,
    name,
    theme_color,
    weekly_hours,
  } = createSquadBodySchema.parse(request.body)

  const user_id = request.user.sub

  const createSquadService = makeSquadService()

  const parsedWeeklyHours = weekly_hours.map(weekly_hours => ({
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

  const squad = await createSquadService.execute({
    background_color,
    description,
    meetings_duration,
    name,
    theme_color,
    weekly_hours: parsedWeeklyHours,
    user_id
  })



  return reply.status(200).send({ squad })
}