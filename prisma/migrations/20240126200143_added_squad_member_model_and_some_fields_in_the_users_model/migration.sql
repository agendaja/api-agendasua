/*
  Warnings:

  - You are about to drop the column `sellers` on the `squads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "squads" DROP COLUMN "sellers";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_confirmed" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "document" DROP NOT NULL,
ALTER COLUMN "password_hash" DROP NOT NULL;

-- CreateTable
CREATE TABLE "squad_members" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "squad_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "squad_members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "squad_members" ADD CONSTRAINT "squad_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "squad_members" ADD CONSTRAINT "squad_members_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
