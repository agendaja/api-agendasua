import { WorkTimeRepository } from "@/repositories/work-time-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { SquadsRepository } from "@/repositories/squads-repository";
import { TimeNotAvailabelError } from "../errors/time-not-available";
import { sumHour } from "@/utils/sumHour";
import { Console } from "console";
import { makeGetDayFreeMeetingsTimesService } from "../factories/meetings/make-get-day-free-meetings-times-service";

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

    const availableTimes = await getDayFreeTimes.execute({ squad_id, date: selected_date })

    const availableTime = availableTimes.find(meeting => meeting.hour === selected_time.hour);

    if (!availableTime?.available) {
      throw new TimeNotAvailabelError();
    }

    const work_time = await this.workTimeRepository.getSellerWorkTime(availableTime.id, squad.id);

    if (!work_time) {
      throw new ResourceNotFoundError()
    }

    if (Number.isNaN(selected_date)) {
      throw new Error('Invalid date');
    }

    const meeting = await this.meetingsRepository.create({
      name,
      description,
      email,
      phone,
      timezone,
      selected_date,
      selected_time: selected_time.hour,
      squad_id,
      owner_id: work_time.user_id,
      end_time: sumHour(selected_time.hour, squad.meetings_duration),
    })

    return {
      meeting,
    }

  }
}