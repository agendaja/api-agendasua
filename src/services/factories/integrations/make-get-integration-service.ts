import { PrismaIntegrationRepository } from "../../../repositories/prisma/prisma-integrations-repository"
import { GetIntegrationService } from "../../integrations/get-integration"

export function makeGetIntegrationService() {
  const prismaIntegrationsRepository = new PrismaIntegrationRepository()
  const getIntegrationService = new GetIntegrationService(prismaIntegrationsRepository)

  return getIntegrationService
}