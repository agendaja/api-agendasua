/*
  Warnings:

  - You are about to drop the column `user_email` on the `integrations` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `integrations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_user_email_fkey";

-- AlterTable
ALTER TABLE "integrations" DROP COLUMN "user_email",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
