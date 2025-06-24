/*
  Warnings:

  - The values [PAYMENT] on the enum `AuctionState` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `media_type` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `media_url` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuctionState_new" AS ENUM ('KYC', 'DELIVERY', 'OBTAINING', 'REVIEW');
ALTER TABLE "auctions" ALTER COLUMN "state" TYPE "AuctionState_new" USING ("state"::text::"AuctionState_new");
ALTER TYPE "AuctionState" RENAME TO "AuctionState_old";
ALTER TYPE "AuctionState_new" RENAME TO "AuctionState";
DROP TYPE "AuctionState_old";
COMMIT;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "media_type",
DROP COLUMN "media_url";

-- CreateTable
CREATE TABLE "review_media" (
    "review_media_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "review_id" INTEGER NOT NULL,

    CONSTRAINT "review_media_pkey" PRIMARY KEY ("review_media_id")
);

-- AddForeignKey
ALTER TABLE "review_media" ADD CONSTRAINT "review_media_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("review_id") ON DELETE CASCADE ON UPDATE CASCADE;
