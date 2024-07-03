import { PrismaWorkTimeRepository } from "@/repositories/prisma/prisma-work-time-repository"
import { GetSellerWorkTimeService } from "@/services/seller/get-work-time-service"



export function makeGetSellerWorkTimeService() {
  const workTimeRepository = new PrismaWorkTimeRepository()
  const getSellerWorkTimeService = new GetSellerWorkTimeService(workTimeRepository)

  return getSellerWorkTimeService
}