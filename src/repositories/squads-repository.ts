import { Prisma, Squad } from "@prisma/client";

export interface SquadsRepository {
  create(data: Prisma.SquadUncheckedCreateInput): Promise<Squad>;
  findSquadsByUserId(user_id: string): Promise<Squad[] | []>;
  findSquadById(squad_id: string): Promise<Squad | null>;
}