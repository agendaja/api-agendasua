import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { PrismaSquadsMemberRepository } from "@/repositories/prisma/prisma-squads-member-repository"
import { GetSellerSquadsService } from "@/services/squads/seller/get-seller-squads"


export function makeGetSellerSquadsService() {
  const squadsRepository = new PrismaSquadsRepository()
  const squadsMemberRepository = new PrismaSquadsMemberRepository()
  const getSellerSquadsService = new GetSellerSquadsService(squadsRepository, squadsMemberRepository)

  return getSellerSquadsService
}