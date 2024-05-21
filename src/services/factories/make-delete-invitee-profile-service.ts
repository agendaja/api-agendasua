import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { DeleteInviteeProfileService } from "../users/delete-invitee-profile"


export function makeDeleteInviteePorfileService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const deleteInviteeProfileService = new DeleteInviteeProfileService(prismaUsersRepository)

  return deleteInviteeProfileService
}