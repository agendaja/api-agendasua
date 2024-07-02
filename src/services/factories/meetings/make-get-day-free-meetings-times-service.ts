import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository"
import { PrismaWorkTimeRepository } from "@/repositories/prisma/prisma-work-time-repository"
import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { GetDayFreeMeetingTimesService } from "@/services/meetings/search-free-meeting-times-service"


export function makeGetDayFreeMeetingsTimesService() {
  const meetingsRepository = new PrismaMeetingsRepository()
  const squadsRepository = new PrismaSquadsRepository()
  const workTimeRepository = new PrismaWorkTimeRepository()
  const getDayFreeMeetingsTimesService = new GetDayFreeMeetingTimesService(meetingsRepository, squadsRepository, workTimeRepository)

  return getDayFreeMeetingsTimesService
}