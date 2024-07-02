import { MeetingTypes } from "@/@types/meetings";
import { makeCreateCalendarEventService } from "@/services/factories/google/make-create-calendar-envent-service";
import { makeUpdateMeetingsService } from "@/services/factories/meetings/make-update-meeting-service";


export default {
  key: 'CreateGoogleEvent',
  async handle({ data }: { data: { meeting: MeetingTypes.Meeting, attendees: MeetingTypes.Attendees } }) {

    const { meeting, attendees } = data;
    const createCalendarEvent = makeCreateCalendarEventService()
    const updateMeetingService = makeUpdateMeetingsService()


    const { hangoutLink } = await createCalendarEvent.execute({
      name: meeting.name,
      description: meeting?.description,
      start_time: meeting.selected_date,
      end_time: meeting.end_time,
      timezone: meeting.timezone || '',
      user_id: meeting.owner_id,
      attendees,
    });

    await updateMeetingService.execute({
      meeting_id: meeting.id,
      data: {
        link: hangoutLink,
      }
    });

  }
}