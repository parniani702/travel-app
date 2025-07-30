import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

import Link from "next/link";

export default async function TripsPage() {
  const session = await auth();

  if (!session) {
    return (
      <span className="text-sky-600 text-4xl font-bold flex items-center justify-center h-screen">
        لطفا ابتدا وارد شوید !
      </span>
    );
  }
  const trips = await prisma.trip.findMany({
    where: {
      userId: session?.user?.id || "",
    },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      {" "}
      <div className="flex items-center justify-between tracking-tight">
        <h1 className="text-3xl font-bold tracking-tight">داشبورد</h1>
        <Link href="/trips/new">
          <Button>سفر جدید</Button>
        </Link>
      </div>
      <Card>
        <CardHeader className="bg-gr">خوش آمدی {session.user?.name}</CardHeader>
        <CardContent>
          <p>
            {trips.length === 0
              ? "شروع به ساختن کنید"
              : `شما ${trips.length} سفر دارید `}
          </p>
        </CardContent>
      </Card>
      {/*  */}
      <div className="text-xl font-semibold mb-4">
        <h2 className="font-semibold my-2">اخرین سفر های شما : </h2>
        {trips.length === 0 ? (
          <Card className="">
            <CardContent className="flex gap-3 flex-col">
              <h3>هنوز سفری وجود نداره</h3>
              <Link href="/trips/new">
                <Button>سفر جدید</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {sortedTrips.slice(0, 6).map((trip, key) => (
              <Link href={`/trips/${trip.id}`} key={key}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col">
                    <p className="text-sm line-clamb-2 mb-2 text-slate-700">
                      {trip.description}
                    </p>
                    <div className="text-sm mb-2">
                      <span className="text-gray-500">
                        رفت : {trip.startDate}
                      </span>
                      <span className="text-gray-400 mx-5">|</span>
                      <span className="text-gray-500">
                        برگشت : {trip.endDate}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
