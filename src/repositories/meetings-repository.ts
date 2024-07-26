import { MeetingTypes } from "@/@types/meetings";
import { Meetings, Prisma } from "@prisma/client";


export interface MeetingsRepository {
  create(data: Prisma.MeetingsUncheckedCreateInput): Promise<Prisma.MeetingsGetPayload<{ include: { owner: true } }>>;
  update(meeting_id: string, data: Prisma.MeetingsUncheckedUpdateInput): Promise<void>;
  getMeetingsFromDate(squad_id: string, date: Date): Promise<MeetingTypes.IncludeSquad[]>;
  findById(meeting_id: string): Promise<Meetings | null>;
  findByOwnerId(owner_id: string, startDate: string, endDate: string): Promise<Meetings[]>;
  findMeetingsByDateTimeRange(squad_id: string, startDate: string, endDate: string): Promise<MeetingTypes.IncludeOwner[]>;
}