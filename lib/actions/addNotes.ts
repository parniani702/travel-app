"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";


export default async function addNote(formData: FormData, tripId: string) {
    const session = await auth()
    if(!session) {
        throw new Error("لطفا ابتدا لاگین کنید")
    }

    const note = formData.get("note")?.toString()
    const color = formData.get("color")?.toString()

    if(!note) {
        throw new Error('ادرس وجود نداره')
    }

    const count = await prisma.notes.count({
        where: {tripId}
    })
    
    await prisma.notes.create({
        data: {
            noteTitle: note,
            tripId,
            count,
            color
        }
    })

    redirect(`/trips/${tripId}`)
}