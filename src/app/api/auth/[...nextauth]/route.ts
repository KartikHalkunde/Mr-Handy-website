import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"

// Get environment variables with fallbacks for build time
const getEnv = () => ({
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db'
})

const env = getEnv()

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: String(credentials.email).toLowerCase()
            }
          })

          if (!user || !user.password) {
            return null
          }

          const isValid = await compare(String(credentials.password), user.password)

          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    }
  },
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  debug: process.env.NODE_ENV === "development"
})
