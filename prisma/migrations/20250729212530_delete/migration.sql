/*
  Warnings:

  - You are about to drop the column `lat` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Location" DROP COLUMN "lat",
DROP COLUMN "lng";
