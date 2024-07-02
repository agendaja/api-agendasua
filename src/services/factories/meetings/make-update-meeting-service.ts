import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository"
import { UpdateMeetingService } from "@/services/meetings/update-meeting-service"

export function makeUpdateMeetingsService() {
  const meetingsRepository = new PrismaMeetingsRepository()

  const updateMeetingService = new UpdateMeetingService(meetingsRepository)

  return updateMeetingService
}