import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/db'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
      GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
})

export { handler as GET, handler as POST }