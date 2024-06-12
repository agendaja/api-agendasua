
import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository"
import { GetMeetingsService } from "@/services/meetings/get-meetings"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"

export function makeGetMeetingsService() {
  const usersRepository = new PrismaUsersRepository()
  const meetingsRepository = new PrismaMeetingsRepository()

  const getMeetingsService = new GetMeetingsService(meetingsRepository, usersRepository)

  return getMeetingsService
}

