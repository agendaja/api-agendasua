import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetInviteeProfileService } from "../users/get-invitee-profile-service"


export function makeGetInviteePorfileService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getInviteeProfileService = new GetInviteeProfileService(prismaUsersRepository)

  return getInviteeProfileService
}