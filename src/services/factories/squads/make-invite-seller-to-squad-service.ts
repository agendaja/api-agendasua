import { PrismaSquadsMemberRepository } from "@/repositories/prisma/prisma-squads-member-repository"
import { InviteSellerToSquadService } from "../../squads/invite-seller-to-squad"
import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"

export function makeInviteSellerToSquadService() {
  const prismaSquadsRepository = new PrismaSquadsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaSquadsMemberRepository = new PrismaSquadsMemberRepository()

  const inviteSellerToSquadService = new InviteSellerToSquadService(
    prismaSquadsRepository,
    prismaUsersRepository,
    prismaSquadsMemberRepository
  )

  return inviteSellerToSquadService
}