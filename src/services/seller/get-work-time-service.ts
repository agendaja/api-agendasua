import { Prisma } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { WorkTimeRepository } from "@/repositories/work-time-repository";

interface GetSellerWorkTimeServiceRequest {
  squad_id: string;
  user_id: string;
}

interface GetSellerWorkTimeServiceResponse {
  work_times: Prisma.WorkTimesGetPayload<{ include: { user: true } }>;
}

export class GetSellerWorkTimeService {
  constructor(
    private workTimeRepository: WorkTimeRepository,
  ) { }

  async execute({ squad_id, user_id }: GetSellerWorkTimeServiceRequest): Promise<GetSellerWorkTimeServiceResponse> {

    const work_times = await this.workTimeRepository.getSellerWorkTime(user_id, squad_id)

    if (!work_times) {
      throw new ResourceNotFoundError()
    }

    return {
      work_times,
    }

  }
}