import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository"
import { PrismaWorkTimeRepository } from "@/repositories/prisma/prisma-work-time-repository"
import { GetDayFreeMeetingTimesService } from "../meetings/search-free-meeting-times-service"


export function makeGetDayFreeMeetingsTimesService() {
  const meetingsRepository = new PrismaMeetingsRepository()
  const workTimeRepository = new PrismaWorkTimeRepository()
  const getDayFreeMeetingsTimesService = new GetDayFreeMeetingTimesService(meetingsRepository, workTimeRepository)

  return getDayFreeMeetingsTimesService
}