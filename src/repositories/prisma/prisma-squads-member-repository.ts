import { prisma } from "@/lib/prisma";
import { SquadMember } from "@prisma/client";
import { SquadsMemberRepository } from "../squads-member-repository";

export class PrismaSquadsMemberRepository implements SquadsMemberRepository {
  async create(squad_id: string, user_id: string) {
    const squadMember = await prisma.squadMember.create({
      data: {
        user_id,
        squad_id
      }
    })

    return squadMember

  }

  async findUserInSquad(squad_id: string, email: string): Promise<SquadMember | null> {
    const squadMember = await prisma.squadMember.findFirst({
      where: {
        squad_id,
        user: {
          email
        }
      }
    })

    return squadMember
  }

  async findSellerSquads(seller_id: string): Promise<{ squad_id: string; }[] | []> {
    const ids = await prisma.squadMember.findMany({
      where: {
        user_id: seller_id
      },
      select: {
        squad_id: true
      }
    })

    return ids
  }
}