"use server"

import { signIn, signOut } from "@/auth"


export const login = async () => {
    await signIn("github", {redirectTo: '/'})

}

export const logoout = async () => {
    await signOut({redirectTo: '/'})
}