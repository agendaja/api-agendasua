
import { v4 as uuid } from 'uuid'

import { calendar } from "@/utils/google/calendar";
import { oauth2Client } from "@/utils/google/oAuthClietnt";

interface CreateCalendarEventServiceRequest {
  name: string,
  description: string,
  start_time: string,
  end_time: string,
  timezone: string,
  invited_email: { email: string, organizer: boolean }[]
}

export class CreateCalendarEventService {
  async execute({
    name,
    description,
    start_time,
    end_time,
    timezone,
    invited_email
  }: CreateCalendarEventServiceRequest) {

    await calendar.events.insert({
      calendarId: "primary",
      sendUpdates: "all",
      sendNotifications: true,
      auth: oauth2Client,
      conferenceDataVersion: 1,
      requestBody: {
        summary: name,
        description,
        start: {
          // RFC3339 format // 2023-08-13T16:07:54
          dateTime: start_time,
          timeZone: timezone
        },
        end: {
          // RFC3339 format // 2023-08-13T16:07:54
          dateTime: end_time,
          timeZone: timezone
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: invited_email,
        reminders: {
          useDefault: true
        }
      },
    })

  }
}








