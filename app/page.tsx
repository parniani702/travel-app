import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export default async function HomePage() {
  const trips = await prisma.trip.findMany({
    take: 9,
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">اخرین سفر ها 🧳</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips.map((trip) => (
          <Card
          key={trip.id}
            className="group border rounded-2xl overflow-hidden hover:shadow-md transition bg-white"
          >
            {trip.imageUrl && (
              <Card className="relative h-40 w-full">
                <Image
                  src={trip.imageUrl}
                  alt={trip.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Card>
            )}

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{trip.title}</h2>
              <p className="text-sm text-gray-500">
                {trip.startDate} تا {trip.endDate}
              </p>
              <p className="text-gray-700 text-sm line-clamp-3">{trip.description}</p>
            </div>
          </Card>
        ))}
      </section>

    </main>
  )
}
