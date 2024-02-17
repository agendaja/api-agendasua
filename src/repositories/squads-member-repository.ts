import { SquadMember } from "@prisma/client";

export interface SquadsMemberRepository {
  create(squad_id: string, user_id: string): Promise<SquadMember>;
  findUserInSquad(squad_id: string, email: string): Promise<SquadMember | null>;
}