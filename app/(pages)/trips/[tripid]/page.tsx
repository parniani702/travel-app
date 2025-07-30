

import { auth } from "@/auth"
import TripDetailClient from "@/components/TripDetailClient"
import { prisma } from "@/lib/prisma"

interface TripProp {
  params: {
    tripid: string;
  };
}

export default async function TripId({params}: TripProp) {
  const { tripid } = await params

  const session = await auth()

  if(!session) {
    return (
      <div>
        
      </div>
    )
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripid
    },
    include: {
      notes: true,
    }
  })


  if(!trip) return <div className="text-xl flex items-center justify-center h-screen">پیدا نشد</div>
  return <TripDetailClient trip={trip} notes={trip.notes} />
}