import { SquadTypes } from "@/@types/squads";
import { Prisma, Squad } from "@prisma/client";

export interface SquadsRepository {
  create(data: Prisma.SquadUncheckedCreateInput): Promise<Squad>;
  update(squad_id: string, data: Prisma.SquadUncheckedUpdateInput): Promise<void>;
  findSquadsByUserId(user_id: string): Promise<Prisma.SquadGetPayload<{ include: { squad_member: true } }>[] | []>;
  findSquadById(squad_id: string): Promise<SquadTypes.IncludeUser | null>;
  findSquadsByIds(data: { squad_id: string }[]): Promise<Squad[] | []>;
  findSquadsByUserIdWithMeetings(user_id: string, start: Date, end: Date): Promise<Prisma.SquadGetPayload<{ include: { meetings: true, work_times: true } }>[] | []>;
  findBySquadIdWithMeetings(squad_id: string, start: Date, end: Date): Promise<Prisma.SquadGetPayload<{ include: { meetings: true, work_times: true, _count: { select: { squad_member: true } } } }> | null>;
}