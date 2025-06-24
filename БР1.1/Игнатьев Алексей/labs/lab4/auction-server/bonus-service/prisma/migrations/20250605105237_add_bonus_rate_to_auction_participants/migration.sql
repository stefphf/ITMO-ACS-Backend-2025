/*
  Warnings:

  - You are about to drop the column `created_at` on the `auction_participants` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `auction_participants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "auction_participants" DROP CONSTRAINT "auction_participants_auction_id_fkey";

-- AlterTable
ALTER TABLE "auction_participants" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "bonus_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "rate" SET DEFAULT 0,
ALTER COLUMN "rate" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "auction_participants" ADD CONSTRAINT "auction_participants_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("auction_id") ON DELETE RESTRICT ON UPDATE CASCADE;
