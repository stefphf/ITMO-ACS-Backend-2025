/*
  Warnings:

  - A unique constraint covering the columns `[ip_address]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ip_details" (
    "ip_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "hosting" BOOLEAN NOT NULL,
    "isp" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "mobile" BOOLEAN NOT NULL,
    "proxy" BOOLEAN NOT NULL,
    "regionName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "ip_details_pkey" PRIMARY KEY ("ip_address")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ip_address_key" ON "users"("ip_address");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_ip_address_fkey" FOREIGN KEY ("ip_address") REFERENCES "ip_details"("ip_address") ON DELETE SET NULL ON UPDATE CASCADE;
