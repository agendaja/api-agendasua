-- DropForeignKey
ALTER TABLE "meetings" DROP CONSTRAINT "meetings_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "meetings" DROP CONSTRAINT "meetings_squad_id_fkey";

-- DropForeignKey
ALTER TABLE "squad_members" DROP CONSTRAINT "squad_members_squad_id_fkey";

-- DropForeignKey
ALTER TABLE "squad_members" DROP CONSTRAINT "squad_members_user_id_fkey";

-- DropForeignKey
ALTER TABLE "squads" DROP CONSTRAINT "squads_user_id_fkey";

-- DropForeignKey
ALTER TABLE "work_times" DROP CONSTRAINT "work_times_squad_id_fkey";

-- DropForeignKey
ALTER TABLE "work_times" DROP CONSTRAINT "work_times_user_id_fkey";

-- AddForeignKey
ALTER TABLE "squads" ADD CONSTRAINT "squads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "squad_members" ADD CONSTRAINT "squad_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "squad_members" ADD CONSTRAINT "squad_members_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_times" ADD CONSTRAINT "work_times_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_times" ADD CONSTRAINT "work_times_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
