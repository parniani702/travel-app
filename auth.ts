
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { prisma } from "./lib/prisma"
import {PrismaAdapter} from '@auth/prisma-adapter'
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(prisma)
})