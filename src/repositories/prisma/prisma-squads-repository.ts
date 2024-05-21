import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { SquadsRepository } from "../squads-repository";

export class PrismaSquadsRepository implements SquadsRepository {

  async create(data: Prisma.SquadUncheckedCreateInput) {
    const squad = await prisma.squad.create({
      data,
    })

    return squad
  }

  async findSquadsByUserId(user_id: string) {
    const squads = await prisma.squad.findMany({
      where: {
        user_id
      },
      include: {
        SquadMember: true
      }
    })

    return squads
  }

  async findSquadById(squad_id: string) {
    const squad = await prisma.squad.findUnique({
      where: {
        id: squad_id
      },
      include: {
        user: true
      }
    })

    return squad
  }

  async findSquadsByIds(data: { squad_id: string }[]) {
    const squads = await prisma.squad.findMany({
      where: {
        id: { in: data.map((i) => i.squad_id) }
      }
    })

    return squads
  }

}