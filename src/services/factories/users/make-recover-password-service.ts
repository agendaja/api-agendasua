import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RecoverPasswordService } from "@/services/users/recover-password"

export function makeRecoverPasswordService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const recoverPasswordService = new RecoverPasswordService(prismaUsersRepository)

  return recoverPasswordService
}