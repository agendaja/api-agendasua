import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository"
import { PrismaWorkTimeRepository } from "@/repositories/prisma/prisma-work-time-repository"
import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { GetSquadService } from "@/services/squads/get-squad-service"


export function makeGetSquadService() {
  const meetingsRepository = new PrismaMeetingsRepository()
  const workTimeRepository = new PrismaWorkTimeRepository()
  const squadsRepository = new PrismaSquadsRepository()
  const getSquadService = new GetSquadService(meetingsRepository, workTimeRepository, squadsRepository)

  return getSquadService
}