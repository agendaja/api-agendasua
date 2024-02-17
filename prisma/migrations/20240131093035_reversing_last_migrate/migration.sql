/*
  Warnings:

  - You are about to drop the column `member_id` on the `work_times` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `work_times` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "work_times" DROP CONSTRAINT "work_times_member_id_fkey";

-- AlterTable
ALTER TABLE "work_times" DROP COLUMN "member_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "work_times" ADD CONSTRAINT "work_times_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
