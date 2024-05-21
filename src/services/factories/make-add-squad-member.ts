import { PrismaSquadsMemberRepository } from "@/repositories/prisma/prisma-squads-member-repository"
import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { PrismaWorkTimeRepository } from "@/repositories/prisma/prisma-work-time-repository"
import { AddSquadMemberService } from "../squads/add-squad-member"

export function makeAddSquadMemberService() {
  const prismaSquadsRepository = new PrismaSquadsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaSquadsMemberRepository = new PrismaSquadsMemberRepository()
  const prismaWorkTimeRepository = new PrismaWorkTimeRepository()

  const addSquadMemberService = new AddSquadMemberService(
    prismaSquadsRepository,
    prismaUsersRepository,
    prismaSquadsMemberRepository,
    prismaWorkTimeRepository
  )

  return addSquadMemberService
}