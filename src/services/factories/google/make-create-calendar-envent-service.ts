import { PrismaGoogleIntegrationDataRepository } from "@/repositories/prisma/prisma-google-integration-data-repository"
import { PrismaIntegrationRepository } from "@/repositories/prisma/prisma-integrations-repository"
import { CreateCalendarEventService } from "@/services/google/create-event-service"

export function makeCreateCalendarEventService() {
  const prismaIntegrationsRepository = new PrismaIntegrationRepository()
  const googleIntegrationDataRepository = new PrismaGoogleIntegrationDataRepository()
  const createCalendarEvent = new CreateCalendarEventService(prismaIntegrationsRepository, googleIntegrationDataRepository)

  return createCalendarEvent
}

