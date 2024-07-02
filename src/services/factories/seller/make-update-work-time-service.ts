import { PrismaWorkTimeRepository } from "@/repositories/prisma/prisma-work-time-repository"
import { UpdateSellerWorkTimeService } from "@/services/seller/update-work-time-service"


export function makeUpdateSellerWorkTimeService() {
  const workTimeRepository = new PrismaWorkTimeRepository()
  const updateSellerWorktimeService = new UpdateSellerWorkTimeService(workTimeRepository)

  return updateSellerWorktimeService
}