import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { GetUserSquadsService } from "@/services/squads/get-user-squads"


export function makeGetUserSquadsService() {
  const squadsRepository = new PrismaSquadsRepository()
  const getUserSquadsService = new GetUserSquadsService(squadsRepository)

  return getUserSquadsService
}