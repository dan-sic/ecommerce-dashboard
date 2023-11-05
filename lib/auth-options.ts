import { PrismaAdapter } from "@auth/prisma-adapter"
import createHttpError from "http-errors"
import NextAuth, { getServerSession, NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

import prisma from "@/lib/db"
import { getEnvVariable } from "@/lib/get-env-variable"

export const authOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: getEnvVariable("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvVariable("GOOGLE_CLIENT_SECRET"),
    }),
    EmailProvider({
      server: getEnvVariable("EMAIL_SERVER"),
      from: getEnvVariable("EMAIL_FROM"),
    }),
  ],
  session: {
    // needed for middleware.ts support
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userId = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.userId
      return session
    },
  },
} satisfies NextAuthOptions

/**
 * Get the session user
 * To be used only server side
 */
export const getSessionUser = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    return session.user
  } else {
    throw new createHttpError.Unauthorized()
  }
}
