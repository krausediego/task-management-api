/*
  Warnings:

  - You are about to drop the column `team_id` on the `TeamMembers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamMembers" DROP CONSTRAINT "TeamMembers_team_id_fkey";

-- AlterTable
ALTER TABLE "TeamMembers" DROP COLUMN "team_id",
ADD COLUMN     "teamId" TEXT;

-- AddForeignKey
ALTER TABLE "TeamMembers" ADD CONSTRAINT "TeamMembers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
