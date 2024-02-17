import { Squad } from "@prisma/client";
import { SquadsRepository } from "@/repositories/squads-repository";

interface GetUserSquadsServiceRequest {
  user_id: string;
}

interface GetUserSquadsServiceResponse {
  squads: Squad[];
}

export class GetUserSquadsService {
  constructor(private squadsRepository: SquadsRepository) { }

  async execute({ user_id }: GetUserSquadsServiceRequest): Promise<GetUserSquadsServiceResponse> {

    const squads = await this.squadsRepository.findSquadsByUserId(user_id)

    return {
      squads,
    }

  }
}