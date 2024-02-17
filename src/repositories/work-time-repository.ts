import { Prisma } from "@prisma/client";

export interface WorkTimeRepository {
  addSquadWorkTimeToSeller(squad_id: string, member_id: string, weekly_hours: Prisma.JsonValue): Promise<void>;
  getSellerWorkTime(seller_id: string): Promise<WorkTimes.WorkTime>;
  getSquadSellersWorkTime(squad_id: string): Promise<WorkTimes.WorkTime[]>;
}