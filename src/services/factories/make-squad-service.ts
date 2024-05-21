import { PrismaSquadsRepository } from "@/repositories/prisma/prisma-squads-repository"
import { CreateSquadService } from "../squads/create-squad-service"

export function makeSquadService() {
  const prismaSquadsRepository = new PrismaSquadsRepository()
  const squadService = new CreateSquadService(prismaSquadsRepository)

  return squadService
}