import { SquadTypes } from "@/@types/squads";
import { Prisma, Squad } from "@prisma/client";

export interface SquadsRepository {
  create(data: Prisma.SquadUncheckedCreateInput): Promise<Squad>;
  findSquadsByUserId(user_id: string): Promise<Squad[] | []>;
  findSquadById(squad_id: string): Promise<SquadTypes.IncludeUser | null>;
  findSquadsByIds(data: { squad_id: string }[]): Promise<Squad[] | []>;
}