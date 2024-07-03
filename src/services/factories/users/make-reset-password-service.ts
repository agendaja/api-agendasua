import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResetPasswordService } from "@/services/users/reset-password"

export function makeResetPasswordService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const resetPasswordService = new ResetPasswordService(prismaUsersRepository)

  return resetPasswordService
}