import { GoogleIntegrationData, Prisma } from "@prisma/client";


export interface GoogleIntegrationDataRepository {
  create(data: Prisma.GoogleIntegrationDataUncheckedCreateInput): Promise<GoogleIntegrationData>;
  update(data: Prisma.GoogleIntegrationDataUpdateInput, integration_id: string): Promise<void>;
}