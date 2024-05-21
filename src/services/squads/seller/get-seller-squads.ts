import { Squad } from "@prisma/client";
import { SquadsRepository } from "@/repositories/squads-repository";
import { SquadsMemberRepository } from "@/repositories/squads-member-repository";

interface GetSellerSquadsServiceRequest {
  seller_id: string;
}

interface GetSellerSquadsServiceResponse {
  squads: Squad[];
}

export class GetSellerSquadsService {
  constructor(
    private squadsRepository: SquadsRepository,
    private squadsMemberRepository: SquadsMemberRepository
  ) { }

  async execute({ seller_id }: GetSellerSquadsServiceRequest): Promise<GetSellerSquadsServiceResponse> {

    const memberSquadsIds = await this.squadsMemberRepository.findSellerSquads(seller_id)

    const squads = await this.squadsRepository.findSquadsByIds(memberSquadsIds)

    return {
      squads,
    }

  }
}