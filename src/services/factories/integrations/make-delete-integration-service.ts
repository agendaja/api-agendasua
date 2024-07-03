import { PrismaIntegrationRepository } from "../../../repositories/prisma/prisma-integrations-repository"
import { DeleteIntegrationService } from "@/services/integrations/delete-integration-service"

export function makeDeleteIntegrationService() {
  const prismaIntegrationsRepository = new PrismaIntegrationRepository()
  const deleteIntegrationService = new DeleteIntegrationService(prismaIntegrationsRepository)

  return deleteIntegrationService
}