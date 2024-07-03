import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { UpdateSquadService } from "@/services/squads/update-squad-service"

export function makeUpdateSquadService() {
  const prismaSquadsRepository = new PrismaSquadsRepository()
  const updateSquadService = new UpdateSquadService(prismaSquadsRepository)

  return updateSquadService
}