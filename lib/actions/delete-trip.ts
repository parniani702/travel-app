"use server"


import { prisma } from "../prisma"
import { redirect } from "next/navigation"

export default async function deleteTrip(tripId: string) {
    await prisma.trip.delete({
        where: {
            id: tripId
        }
    })

    redirect("/trips")
}