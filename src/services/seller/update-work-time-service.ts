import { WorkTimeRepository } from "@/repositories/work-time-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateSellerWorkTimeServiceRequest {
  user_id: string;
  squad_id: string;
  weekly_hours: {
    name: string;
    available: boolean;
    hours: {
      start_hour: string;
      end_hour: string;
    }[];
  }[];
}

export class UpdateSellerWorkTimeService {
  constructor(
    private workTimeRepository: WorkTimeRepository,
  ) { }

  async execute({ squad_id, user_id, weekly_hours }: UpdateSellerWorkTimeServiceRequest) {

    const work_times = await this.workTimeRepository.getSellerWorkTime(user_id, squad_id)

    if (!work_times) {
      throw new ResourceNotFoundError()
    }

    await this.workTimeRepository.update(work_times.id, { weekly_hours })

  }
}