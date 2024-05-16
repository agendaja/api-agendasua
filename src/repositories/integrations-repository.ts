import { Integration, Prisma } from "@prisma/client";


export interface IntegrationsRepository {
  create(data: Prisma.IntegrationUncheckedCreateInput): Promise<Integration>;
  delete(id: string): Promise<void>;
  findByUserEmail(email: string, name: string): Promise<Integration | null>;
}