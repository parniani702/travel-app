"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


export async function createTrip(formData: FormData) {

    const session = await auth()
    if(!session || !session.user?.id) {
        throw new Error("you need to login")
    }


    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const startDateStr = formData.get("startDate")?.toString();
    const endDateStr = formData.get("endDate")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();


    if(!title || !description || !startDateStr || !endDateStr) {
        return new Error("All Fields is Required")
    }

    const startDate = startDateStr
    const endDate = endDateStr

    await prisma.trip.create({
        data: {
            title,
            description,
            startDate,
            endDate,
            userId: session.user.id || "",
            imageUrl
        }
    })
    redirect('/trips/')
}