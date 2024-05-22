import { Prisma, WorkTimes } from "@prisma/client";


export interface WorkTimeRepository {
  update(id: string, data: Prisma.WorkTimesUpdateInput): Promise<void>;
  addSquadWorkTimeToSeller(squad_id: string, member_id: string, weekly_hours: Prisma.JsonValue): Promise<void>;
  getSellerWorkTime(seller_id: string, squad_id: string): Promise<Prisma.WorkTimesGetPayload<{ include: { user: true } }> | null>;
  getSquadSellersWorkTime(squad_id: string): Promise<WorkTimes[]>;
}