import { WorkTimeRepository } from "@/repositories/work-time-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { SquadsRepository } from "@/repositories/squads-repository";
import { TimeNotAvailabelError } from "../errors/time-not-available";
import { sumHour } from "@/utils/sumHour";
import { makeGetDayFreeMeetingsTimesService } from "../factories/make-get-day-free-meetings-times-service";
import { CreateCalendarEventService } from "../googleCalendar/create-event-service";
import { setHours, setMinutes } from "date-fns";

interface CreateMeetingServiceRequest {
  name: string;
  description: string;
  email: string;
  phone: string;
  timezone: string;
  selected_date: Date;
  selected_time: {
    available: boolean;
    hour: string;
    id: string;
  };
  squad_id: string;
}

export class CreateMeetingService {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private workTimeRepository: WorkTimeRepository,
    private squadsRepository: SquadsRepository,
  ) { }

  async execute({
    name,
    description,
    email,
    phone,
    timezone,
    selected_date,
    selected_time,
    squad_id,
  }: CreateMeetingServiceRequest) {

    const squad = await this.squadsRepository.findSquadById(squad_id);

    if (!squad) {
      throw new ResourceNotFoundError();
    }

    const getDayFreeTimes = makeGetDayFreeMeetingsTimesService()
    const createCalendarEvent = new CreateCalendarEventService()

    const availableTimes = await getDayFreeTimes.execute({ squad_id, date: selected_date })

    const availableTime = availableTimes.find(meeting => meeting.hour === selected_time.hour);

    if (!availableTime?.available) {
      throw new TimeNotAvailabelError();
    }

    const work_time = await this.workTimeRepository.getSellerWorkTime(availableTime.id);

    if (Number.isNaN(selected_date)) {
      throw new Error('Invalid date');
    }

    const meeting = await this.meetingsRepository.create({
      name,
      email,
      phone,
      timezone,
      selected_date,
      selected_time: selected_time.hour,
      squad_id,
      owner_id: work_time.user_id,
      end_time: sumHour(selected_time.hour, squad.meetings_duration),
    })

    // Covert 00:00 to RFC3339 => 2023-08-13T16:07:54
    const [hours, minute] = selected_time.hour.split(':').map(Number)
    const date = new Date(selected_date);
    const end_time = setHours(setMinutes(date, minute), hours);

    await createCalendarEvent.execute({
      name,
      description,
      start_time: selected_date.toDateString(),
      end_time: end_time.toISOString(),
      timezone,
      invited_email: [
        {
          email,
          organizer: false
        },
        {
          email: work_time.user.email,
          organizer: true
        }
      ]
    })

    return {
      meeting,
    }

  }
}