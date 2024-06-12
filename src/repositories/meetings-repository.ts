import { MeetingTypes } from "@/@types/meetings";
import { Meetings, Prisma } from "@prisma/client";


export interface MeetingsRepository {
  // create(data: Prisma.MeetingsUncheckedCreateInput): Promise<Meetings>;
  create(data: Prisma.MeetingsUncheckedCreateInput): Promise<Prisma.MeetingsGetPayload<{ include: { owner: true } }>>;
  getMeetingsFromDate(squad_id: string, date: Date): Promise<MeetingTypes.IncludeSquad[]>;
  findByOwnerId(owner_id: string, startDate: Date, endDate: Date): Promise<Meetings[]>;
}