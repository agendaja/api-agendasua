import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { TimeNotAvailabelError } from "@/services/errors/time-not-available";
import { makeCreateCalendarEventService } from "@/services/factories/google/make-create-calendar-envent-service";
import { makeCreateMeetingsService } from "@/services/factories/meetings/make-meeting-service";
import { FastifyReply, FastifyRequest } from "fastify";
import moment from "moment-timezone";
import { z } from "zod";
import GoogleEventQueue from "@/lib/queue";


export async function create(request: FastifyRequest, reply: FastifyReply) {

  const createMeetingBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    description: z.string(),
    phone: z.string().min(10).max(14),
    timezone: z.string(),
    selected_date: z.coerce.date(),
    selected_time: z.object({
      available: z.boolean(),
      hour: z.string(),
      id: z.string(),
    }),
    squad_id: z.string(),
  })

  const {
    name,
    description,
    email,
    phone,
    timezone,
    selected_date,
    selected_time,
    squad_id,
  } = createMeetingBodySchema.parse(request.body)

  const [hours, minute] = selected_time.hour.split(':').map(Number)


  const parsedSelectedDate = moment.tz(selected_date, 'America/Sao_Paulo').utcOffset(0).set({ hours, minute }).toDate()

  // TODO: if the event has a availability of time, validate if the choosen date and time follows the availability

  const createMeetingService = makeCreateMeetingsService()
  const createCalendarEvent = makeCreateCalendarEventService()


  try {
    const { meeting } = await createMeetingService.execute({
      name,
      description,
      email,
      phone,
      timezone,
      selected_date: parsedSelectedDate,
      selected_time,
      squad_id,
    })

    const attendees = [
      {
        email,
        organizer: false
      },
      {
        email: meeting.owner.email,
        organizer: true
      }
    ]
    // Acionar Job de criação eventos no Google
    await GoogleEventQueue.add('CreateGoogleEvent', { meeting, attendees })

    return reply.status(200).send({ meeting })

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof TimeNotAvailabelError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}