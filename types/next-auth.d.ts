import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      onboardingCompleted?: boolean
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    onboardingCompleted?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    onboardingCompleted?: boolean
  }
}
