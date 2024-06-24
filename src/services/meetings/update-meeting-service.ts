import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MeetingsRepository } from "@/repositories/meetings-repository";

interface UpdateMeetingServiceRequest {
  meeting_id: string;
  data: {
    name?: string;
    description?: string | null;
    email?: string;
    phone?: string;
    timezone?: string;
    selected_date?: Date;
    link?: string | null;
    end_time?: string;
  }
}

export class UpdateMeetingService {
  constructor(
    private meetingsRepository: MeetingsRepository,
  ) { }

  async execute({
    meeting_id,
    data
  }: UpdateMeetingServiceRequest) {

    const meeting = await this.meetingsRepository.findById(meeting_id);

    if (!meeting) {
      throw new ResourceNotFoundError();
    }

    await this.meetingsRepository.update(meeting_id, data)
  }
}