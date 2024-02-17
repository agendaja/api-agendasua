/*
  Warnings:

  - You are about to drop the column `user_id` on the `work_times` table. All the data in the column will be lost.
  - Added the required column `member_id` to the `work_times` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "work_times" DROP CONSTRAINT "work_times_user_id_fkey";

-- AlterTable
ALTER TABLE "work_times" DROP COLUMN "user_id",
ADD COLUMN     "member_id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "work_times" ADD CONSTRAINT "work_times_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "squad_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_times" ADD CONSTRAINT "work_times_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
