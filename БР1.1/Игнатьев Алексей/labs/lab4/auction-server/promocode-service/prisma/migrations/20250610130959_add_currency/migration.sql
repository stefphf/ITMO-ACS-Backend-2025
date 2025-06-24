-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('RUB', 'KZT');

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "zip_code" TEXT;

-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'RUB';
