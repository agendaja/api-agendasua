import { Prisma } from "@prisma/client";


export interface WorkTimeRepository {
  update(id: string, data: Prisma.WorkTimesUpdateInput): Promise<void>;
  addSquadWorkTimeToSeller(squad_id: string, member_id: string, weekly_hours: Prisma.JsonValue): Promise<void>;
  getSellerWorkTime(id: string, seller_id: string): Promise<Prisma.WorkTimesGetPayload<{ include: { user: true } }> | null>;
  getSquadSellersWorkTime(squad_id: string): Promise<Prisma.WorkTimesGetPayload<{ include: { user: { select: { integration: true } } } }>[] | []>;
}