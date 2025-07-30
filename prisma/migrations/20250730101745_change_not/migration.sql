/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Location" DROP CONSTRAINT "Location_tripId_fkey";

-- DropTable
DROP TABLE "public"."Location";

-- CreateTable
CREATE TABLE "public"."Notes" (
    "id" TEXT NOT NULL,
    "noteTitle" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Notes" ADD CONSTRAINT "Notes_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
