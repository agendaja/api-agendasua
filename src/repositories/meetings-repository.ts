import { MeetingTypes } from "@/@types/meetings";
import { Meetings, Prisma } from "@prisma/client";


export interface MeetingsRepository {
  create(data: Prisma.MeetingsUncheckedCreateInput): Promise<Meetings>;
  getMeetingsFromDate(squad_id: string, date: Date): Promise<MeetingTypes.IncludeSquad[]>;
}