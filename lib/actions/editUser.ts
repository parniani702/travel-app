"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { User } from "../generated/prisma";
import { redirect } from "next/navigation";

export default async function editUSer(formData: FormData, user: User, imageUrl: string) {
    const session = await auth()

    if(!session) {
        throw new Error("باید ابتدا لاگین کنید")
    }


    const name = formData.get("name")?.toString() || user.name
    const email = formData.get("email")?.toString() || user.email


    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            name: name,
            email: email,
            image: imageUrl,
        }
    })

    redirect("/trips")
}