-- CreateTable
CREATE TABLE "promocodes" (
    "promocode_id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "replinish_bonus" INTEGER NOT NULL,
    "activation_count" INTEGER,
    "current_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promocodes_pkey" PRIMARY KEY ("promocode_id")
);

-- CreateTable
CREATE TABLE "bonuses" (
    "bonus_id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "percent" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bonuses_pkey" PRIMARY KEY ("bonus_id")
);
