import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AthenticateService } from "../users/athenticate"

export function makeAuthenticateService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateService = new AthenticateService(prismaUsersRepository)

  return authenticateService
}