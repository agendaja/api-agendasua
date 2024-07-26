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

  async update(id: string, data: Prisma.SquadUncheckedUpdateInput) {
    await prisma.squad.update({
      where: {
        id,
      },
      data
    })

  }

  async findSquadsByUserId(user_id: string) {
    const squads = await prisma.squad.findMany({
      where: {
        user_id
      },
      include: {
        squad_member: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
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

  async findSquadsByUserIdWithMeetings(user_id: string, start: Date, end: Date) {
    const squads = await prisma.squad.findMany({
      where: {
        user_id
      },
      include: {
        meetings: {
          where: {
            selected_date: {
              gte: start,
              lte: end,
            }
          }
        },
        work_times: true
      }
    })

    return squads
  }

  async findBySquadIdWithMeetings(id: string, start: Date, end: Date) {
    const squad = await prisma.squad.findUnique({
      where: {
        id
      },
      include: {
        meetings: {
          where: {
            selected_date: {
              gte: start,
              lte: end,
            }
          }
        },
        work_times: true,
        _count: {
          select: {
            squad_member: true
          }
        }

      }
    })

    return squad
  }

}