import { Prisma, WorkTimes } from "@prisma/client";
import { WorkTimes as CustomType } from "@/@types/work-times";


export interface WorkTimeRepository {
  addSquadWorkTimeToSeller(squad_id: string, member_id: string, weekly_hours: Prisma.JsonValue): Promise<void>;
  getSellerWorkTime(seller_id: string): Promise<CustomType.IncludeUser>;
  getSquadSellersWorkTime(squad_id: string): Promise<WorkTimes[]>;
}