import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileService } from "../users/get-user-profile"


export function makeGetUserPorfileService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserProfileService = new GetUserProfileService(prismaUsersRepository)

  return getUserProfileService
}