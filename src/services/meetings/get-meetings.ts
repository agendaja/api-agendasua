import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Meetings } from "@prisma/client";
import { addDays } from "date-fns";

interface GetMeetingsServiceRequest {
  user_id: string;
}

interface GetMeetingsServiceResponse {
  meetings: Meetings[];
}

export class GetMeetingsService {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private usersRepository: UsersRepository,
  ) { }

  async execute({
    user_id,
  }: GetMeetingsServiceRequest): Promise<GetMeetingsServiceResponse> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const today = new Date()

    const endDate = addDays(today, 7)

    const meetings = await this.meetingsRepository.findByOwnerId(user_id, today, endDate)

    return {
      meetings,
    }

  }
}