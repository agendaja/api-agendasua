import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { GoogleIntegrationDataRepository } from "../google-integration-data-repository";

export class PrismaGoogleIntegrationDataRepository implements GoogleIntegrationDataRepository {
  async create(data: Prisma.GoogleIntegrationDataUncheckedCreateInput) {
    const integration = await prisma.googleIntegrationData.create({
      data,
    });

    return integration;
  }

  async update(data: Prisma.GoogleIntegrationDataUpdateInput, integration_id: string) {
    await prisma.googleIntegrationData.update({
      where: {
        integration_id
      },
      data
    })
  }
}
