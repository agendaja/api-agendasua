/*
  Warnings:

  - You are about to drop the column `user_email` on the `squad_members` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `squad_members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "squad_members" DROP CONSTRAINT "squad_members_user_email_fkey";

-- AlterTable
ALTER TABLE "squad_members" DROP COLUMN "user_email",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "squad_members" ADD CONSTRAINT "squad_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
