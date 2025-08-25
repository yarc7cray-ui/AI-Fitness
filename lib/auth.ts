import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare, hash } from "bcryptjs"
import { UserStore } from "@/lib/user-store"

export interface ExtendedUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  onboardingCompleted?: boolean
}

// Simple in-memory user store for demo (replace with database in production)
const users: Array<{ 
  id: string
  name: string
  email: string
  password: string
  image?: string
  onboardingCompleted: boolean
  createdAt: string
}> = []

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
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

        const user = users.find(u => u.email === credentials.email)
        
        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)
        
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          onboardingCompleted: user.onboardingCompleted,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.onboardingCompleted = (user as ExtendedUser).onboardingCompleted || false
      }

      // Handle Google OAuth signup
      if (account?.provider === "google" && user) {
        const existingUser = users.find(u => u.email === user.email)
        
        if (!existingUser) {
          // Create new user for Google signup
          const newUser = {
            id: user.id,
            name: user.name || "User",
            email: user.email || "",
            password: "", // No password for OAuth users
            image: user.image,
            onboardingCompleted: false,
            createdAt: new Date().toISOString()
          }
          users.push(newUser)
          token.onboardingCompleted = false
        } else {
          token.onboardingCompleted = existingUser.onboardingCompleted
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        ;(session.user as ExtendedUser).onboardingCompleted = token.onboardingCompleted as boolean
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
}

// Helper functions for user management
export const AuthHelpers = {
  async createUser(email: string, password: string, name: string = "User") {
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      throw new Error("User already exists")
    }

    const hashedPassword = await hash(password, 12)
    const userId = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const newUser = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      onboardingCompleted: false,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    return newUser
  },

  async updateUserOnboarding(userId: string, completed: boolean) {
    const user = users.find(u => u.id === userId)
    if (user) {
      user.onboardingCompleted = completed
    }
  },

  getUserByEmail(email: string) {
    return users.find(u => u.email === email)
  },

  // Seed some demo users for development
  async seedDemoUsers() {
    if (users.length === 0) {
      await this.createUser("demo@fitness.ai", "password123", "Demo User")
      await this.createUser("john@example.com", "password123", "John Doe")
    }
  }
}

// Initialize demo users in development
if (process.env.NODE_ENV === "development") {
  AuthHelpers.seedDemoUsers()
}
