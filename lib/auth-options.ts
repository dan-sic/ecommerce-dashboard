import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

import prisma from "@/lib/db"

export const authOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
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
