-- CreateTable
CREATE TABLE "utm_markers" (
    "utm_id" SERIAL NOT NULL,
    "utm_source" TEXT NOT NULL,
    "utm_medium" TEXT NOT NULL,
    "utm_campaign" TEXT NOT NULL,
    "utm_term" TEXT NOT NULL,
    "utm_content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "utm_markers_pkey" PRIMARY KEY ("utm_id")
);

-- AddForeignKey
ALTER TABLE "utm_markers" ADD CONSTRAINT "utm_markers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
