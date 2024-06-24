import { MeetingTypes } from "@/@types/meetings";
import { makeCreateCalendarEventService } from "@/services/factories/google/make-create-calendar-envent-service";


export default {
  key: 'SendUserMail',
  async handle({ data }: { data: { meeting: MeetingTypes.Meeting, attendees: MeetingTypes.Attendees } }) {

    const { meeting, attendees } = data;
    const createCalendarEvent = makeCreateCalendarEventService()

    const calendarEvent = await createCalendarEvent.execute({
      name: meeting.name,
      description: meeting?.description,
      start_time: meeting.selected_date,
      end_time: meeting.end_time,
      timezone: meeting.timezone || '',
      user_id: meeting.owner_id,
      attendees,
    });

    console.log(calendarEvent)

    // // Atualize a reunião com o link do Google Meet
    // await prisma.meeting.update({
    //   where: { id: meeting.id },
    //   data: { meetLink: calendarEvent.hangoutLink },
    // });
  }
}