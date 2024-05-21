/*
  Warnings:

  - You are about to drop the column `userId` on the `work_times` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "work_times" DROP CONSTRAINT "work_times_userId_fkey";

-- AlterTable
ALTER TABLE "work_times" DROP COLUMN "userId";
