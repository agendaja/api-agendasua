import { prisma } from "@/lib/prisma";
import { MeetingsRepository } from "../meetings-repository";
import { Prisma } from "@prisma/client";
import { MeetingTypes } from "@/@types/meetings";

export class PrismaMeetingsRepository implements MeetingsRepository {
  async create(data: Prisma.MeetingsUncheckedCreateInput) {
    const meeting = await prisma.meetings.create({
      data,
      include: {
        owner: true
      }
    });

    return meeting;
  }

  async findByOwnerId(owner_id: string, startDate: Date, endDate: Date) {
    const meetings = await prisma.meetings.findMany({
      where: {
        owner_id,
        selected_date: {
          gte: startDate,
          lte: endDate
        }
      },
    });

    return meetings;
  }

  async getMeetingsFromDate(squad_id: string, date: Date) {

    const meetings = await prisma.meetings.findMany({
      where: {
        squad_id,
        selected_date: {
          gte: new Date(new Date(date.toISOString()).setHours(0)),
          lt: new Date(new Date(date.toISOString()).setHours(23))
        },
      },
      include: {
        squad: true
      }
    })

    return meetings as MeetingTypes.IncludeSquad[];
  }

}
