import { PrismaGoogleIntegrationDataRepository } from "@/repositories/prisma/prisma-google-integration-data-repository"
import { PrismaIntegrationRepository } from "../../repositories/prisma/prisma-integrations-repository"
import { GetIntegrationService } from "../integrations/get-integration"

export function makeGetIntegrationService() {
  const prismaIntegrationsRepository = new PrismaIntegrationRepository()
  const prismaGoogleIntegrationDataRepository = new PrismaGoogleIntegrationDataRepository()
  const getIntegrationService = new GetIntegrationService(prismaIntegrationsRepository, prismaGoogleIntegrationDataRepository)

  return getIntegrationService
}