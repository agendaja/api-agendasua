import { PrismaWorkTimeRepository } from "@/repositories/prisma/prisma-work-time-repository"
import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository"
import { CreateMeetingService } from "@/services/meetings/create-meeting-service"

export function makeCreateMeetingsService() {
  const workTimeRepository = new PrismaWorkTimeRepository()
  const squadsRepository = new PrismaSquadsRepository()
  const meetingsRepository = new PrismaMeetingsRepository()

  const createMeetingService = new CreateMeetingService(meetingsRepository, workTimeRepository, squadsRepository)

  return createMeetingService
}