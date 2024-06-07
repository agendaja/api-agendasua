import { PrismaGoogleIntegrationDataRepository } from "@/repositories/prisma/prisma-google-integration-data-repository"
import { PrismaIntegrationRepository } from "../../../repositories/prisma/prisma-integrations-repository"
import { CreateIntegrationService } from "../../integrations/create"

export function makeCreateIntegrationService() {
  const prismaIntegrationsRepository = new PrismaIntegrationRepository()
  const prismaGoogleIntegrationDataRepository = new PrismaGoogleIntegrationDataRepository()
  const createIntegrationService = new CreateIntegrationService(prismaIntegrationsRepository, prismaGoogleIntegrationDataRepository)

  return createIntegrationService
}