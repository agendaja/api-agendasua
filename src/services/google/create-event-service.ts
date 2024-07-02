
import { v4 as uuid } from 'uuid'
import { addHours, setHours, setMinutes } from 'date-fns';
import { google } from 'googleapis';

import { IntegrationsRepository } from '@/repositories/integrations-repository';
import { getOAuth2Client } from '@/utils/google/getOAuthClient';
import { GoogleIntegrationDataRepository } from '@/repositories/google-integration-data-repository';

interface CreateCalendarEventServiceRequest {
  name: string,
  description: string | null,
  start_time: Date,
  end_time: string,
  timezone: string | null,
  user_id: string,
  attendees: { email: string, organizer: boolean }[]
}

export class CreateCalendarEventService {
  constructor(
    private integrationsRepository: IntegrationsRepository,
    private googleIntegrationDataRepository: GoogleIntegrationDataRepository
  ) { }

  async execute({
    name,
    description,
    start_time,
    end_time,
    timezone,
    user_id,
    attendees
  }: CreateCalendarEventServiceRequest) {

    const oauth2Client = await getOAuth2Client(user_id, this.integrationsRepository, this.googleIntegrationDataRepository)

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    })

    // Covert end_time from 09:00 to RFC3339 => 2023-08-13T09:00:00
    const [hours, minute] = end_time.split(':').map(Number)
    const date = new Date(start_time);
    const parsedEndTime = setHours(setMinutes(date, minute), hours).toISOString();


    //* *  Adiciona 3 horas ao horário de início por conta de bug do google **//
    const parsedStartTime = addHours(start_time, 3)

    const { data: { hangoutLink } } = await calendar.events.insert({
      calendarId: "primary",
      sendUpdates: "all",
      sendNotifications: true,
      conferenceDataVersion: 1,
      requestBody: {
        summary: name,
        description,
        start: {
          // RFC3339 format // 2023-08-13T16:07:54
          dateTime: parsedStartTime.toISOString(),
          timeZone: timezone
        },
        end: {
          // RFC3339 format // 2023-08-13T16:07:54
          dateTime: parsedEndTime,
          timeZone: timezone
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees,
        reminders: {
          useDefault: true
        }
      },
    })

    return { hangoutLink }

  }
}








