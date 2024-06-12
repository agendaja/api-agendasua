import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetDashboardDataService } from "@/services/dashboard/get-data-service"

export function makeGetDashboardDataService() {
  const prismaSquadsRepository = new PrismaSquadsRepository()
  const getDashboardDataService = new GetDashboardDataService(prismaSquadsRepository)

  return getDashboardDataService
}