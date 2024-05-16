import { GoogleIntegrationData, Prisma } from "@prisma/client";


export interface GoogleIntegrationDataRepository {
  create(data: Prisma.GoogleIntegrationDataUncheckedCreateInput): Promise<GoogleIntegrationData>;
}