import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async createPreRegister(data: Users.PreRegister) {
    await prisma.invite.create({
      data,
    })
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        integration: true
      }
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user
  }

  async findInviteeByEmail(email: string, squad_id: string) {
    const invitee = await prisma.invite.findFirst({
      where: {
        email,
        squad_id
      },
      include: {
        squad: true
      }
    })

    return invitee
  }

  async deleteInviteeProfile(id: string): Promise<void> {
    await prisma.invite.delete({
      where: {
        id
      }
    })
  }
}