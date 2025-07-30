-- DropForeignKey
ALTER TABLE "public"."Notes" DROP CONSTRAINT "Notes_tripId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notes" ADD CONSTRAINT "Notes_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
