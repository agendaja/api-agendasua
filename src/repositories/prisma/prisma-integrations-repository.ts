import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IntegrationsRepository } from "../integrations-repository";

export class PrismaIntegrationRepository implements IntegrationsRepository {
  async create(data: Prisma.IntegrationUncheckedCreateInput) {
    const integration = await prisma.integration.create({
      data,
    });

    return integration;
  }

  async findByUserId(user_id: string, name: string, includeGData: boolean) {
    const integration = await prisma.integration.findFirst({
      where: {
        user_id,
        name,
      },
      include: {
        googleIntegration: includeGData
      }
    });

    return integration;
  }

  async delete(id: string): Promise<void> {
    await prisma.integration.delete({
      where: {
        id
      }
    });

  }

}
