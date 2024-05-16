-- DropForeignKey
ALTER TABLE "GoogleIntegrationData" DROP CONSTRAINT "GoogleIntegrationData_integration_id_fkey";

-- DropForeignKey
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_user_email_fkey";

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoogleIntegrationData" ADD CONSTRAINT "GoogleIntegrationData_integration_id_fkey" FOREIGN KEY ("integration_id") REFERENCES "integrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
