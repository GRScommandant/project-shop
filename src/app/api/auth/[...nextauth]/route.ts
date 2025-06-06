// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"
import { userService } from "@/lib/services/user.service"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
    signOut:"/auth/signout",
    newUser: "/auth/new-user"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com"
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••"
        }
      },
      async authorize(credentials) {
        try {
          if (!((credentials?.email || credentials?.username ) && credentials?.password)) {
            throw new Error("Please enter an email and password")
          }

          const user = await userService.getUserByEmail(credentials.email) ||await userService.getUserByUsername(credentials.username)

          if (!user) {
            throw new Error("No user found with this email")
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error("Invalid password")
          }

          // Return only the data needed for the session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          throw error
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "update" && token) {
        // Fetch fresh user data when session is updated
        const updatedUser = await userService.getUserById(token.id as string)
        if (updatedUser) {
          token.name = updatedUser.name
          token.email = updatedUser.email
        }
      }

      if (user) {
        // Initial sign in
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
      return token
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
        }
      }
    }
  },
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user.email)
    },
    async signOut({ token }) {
      console.log("User signed out:", token.email)
    },
    async createUser({ user }) {
      console.log("New user created:", user.email)
    },
  },

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
