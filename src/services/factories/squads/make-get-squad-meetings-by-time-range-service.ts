import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository"
import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { GetSquadMeetingsByTimeRangeService } from "@/services/squads/get-squad-meetings-by-time-range-service"


export function makeGetSquadMeetingsByTimeRangeService() {
  const meetingsRepository = new PrismaMeetingsRepository()
  const squadsRepository = new PrismaSquadsRepository()
  const getSquadMeetingsByTimeRange = new GetSquadMeetingsByTimeRangeService(squadsRepository, meetingsRepository)

  return getSquadMeetingsByTimeRange
}