/*
  Warnings:

  - A unique constraint covering the columns `[integration_id]` on the table `GoogleIntegrationData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_user_id_fkey";

-- AlterTable
ALTER TABLE "meetings" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GoogleIntegrationData_integration_id_key" ON "GoogleIntegrationData"("integration_id");

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
