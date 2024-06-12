import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetDashboardDataService } from "@/services/dashboard/get-data-service"
import { GetSquadAnalyticsService } from "@/services/dashboard/get-squad-analytics-service"

export function makeGetSquadAnalyticsService() {
  const prismaSquadsRepository = new PrismaSquadsRepository()
  const getSquadAnalyticsService = new GetSquadAnalyticsService(prismaSquadsRepository)

  return getSquadAnalyticsService
}