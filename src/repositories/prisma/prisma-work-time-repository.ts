import { WorkTimes } from "@/@types/work-times";
import { WorkTimeRepository } from "../work-time-repository";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


export class PrismaWorkTimeRepository implements WorkTimeRepository {
  async update(id: string, data: Prisma.WorkTimesUpdateInput) {
    await prisma.workTimes.update({
      where: {
        id
      },
      data
    })

  }

  async getSquadSellersWorkTime(squad_id: string) {
    const work_times = await prisma.workTimes.findMany({
      where: {
        squad_id,
      },
      include: {
        user: {
          select: {
            integration: true
          }
        }
      }
    })

    return work_times
  }

  async getSellerWorkTime(id: string, squad_id: string) {
    const work_time = await prisma.workTimes.findFirst({
      where: {
        id,
        squad_id
      },
      include: {
        user: true
      }
    })

    return work_time
  }

  async addSquadWorkTimeToSeller(squad_id: string, seller_id: string, weekly_hours: WorkTimes.weekly_hours) {
    await prisma.workTimes.create({
      data: {
        user_id: seller_id,
        squad_id,
        weekly_hours,
      }
    })

  }

}