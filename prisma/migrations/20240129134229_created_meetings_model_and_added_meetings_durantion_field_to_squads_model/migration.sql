/*
  Warnings:

  - Added the required column `meetings_duration` to the `squads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "squads" ADD COLUMN     "meetings_duration" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "meetings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "selected_date" TIMESTAMP(3) NOT NULL,
    "selected_time" TEXT NOT NULL,
    "timezone" TEXT,
    "end_time" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "squad_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
