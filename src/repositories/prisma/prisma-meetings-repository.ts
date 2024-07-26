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

  async update(id: string, data: Prisma.MeetingsUncheckedUpdateInput) {
    await prisma.meetings.update({
      where: {
        id
      },
      data
    });

  }

  async findById(id: string) {
    const meeting = await prisma.meetings.findUnique({
      where: {
        id
      }
    });

    return meeting;
  }

  async findByOwnerId(owner_id: string, startDate: string, endDate: string) {
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

  async findMeetingsByDateTimeRange(squad_id: string, startDate: string, endDate: string) {

    const end_time = endDate.split('T')[1].substring(0, 5);
    const selected_time = startDate.split('T')[1].substring(0, 5);

    const meetings = await prisma.meetings.findMany({
      where: {
        squad_id,
        selected_date: {
          equals: startDate
        },
        end_time,
        selected_time,
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    return meetings;
  }

}
