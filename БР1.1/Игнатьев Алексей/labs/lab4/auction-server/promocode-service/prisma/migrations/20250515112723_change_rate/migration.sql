/*
  Warnings:

  - You are about to alter the column `rate` on the `auction_participants` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Made the column `rate` on table `auction_participants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
DELETE FROM "auction_participants";
ALTER TABLE "auction_participants" ALTER COLUMN "rate" SET NOT NULL,
ALTER COLUMN "rate" SET DATA TYPE INTEGER;
