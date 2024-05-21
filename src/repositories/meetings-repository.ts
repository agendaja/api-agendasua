import { MeetingTypes } from "@/@types/meetings";
import { Prisma } from "@prisma/client";


export interface MeetingsRepository {
  // create(data: Prisma.MeetingsUncheckedCreateInput): Promise<Meetings>;
  create(data: Prisma.MeetingsUncheckedCreateInput): Promise<Prisma.MeetingsGetPayload<{ include: { owner: true } }>>;
  getMeetingsFromDate(squad_id: string, date: Date): Promise<MeetingTypes.IncludeSquad[]>;
}