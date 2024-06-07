import { Integration, Prisma } from "@prisma/client";


export interface IntegrationsRepository {
  create(data: Prisma.IntegrationUncheckedCreateInput): Promise<Integration>;
  delete(id: string, user_id: string): Promise<void>;
  findByUserId(id: string, name: string, includeGData?: boolean): Promise<Prisma.IntegrationGetPayload<{ include: { googleIntegration: true } }> | null>;
}