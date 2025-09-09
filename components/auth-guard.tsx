"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/local-auth-provider"

interface AuthGuardProps {
  children: React.ReactNode
  requireOnboarding?: boolean
}

export function AuthGuard({ children, requireOnboarding = false }: AuthGuardProps) {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return // Wait for auth state to load

    if (!isAuthenticated) {
      router.push('/auth/signin')
      return
    }

    if (user) {
      // If onboarding is required but not completed
      if (requireOnboarding && !user.onboardingCompleted) {
        router.push('/onboarding')
        return
      }

      // If user completed onboarding but tries to access onboarding page
      if (!requireOnboarding && user.onboardingCompleted && window.location.pathname === '/onboarding') {
        router.push('/dashboard')
        return
      }
    }
  }, [isAuthenticated, user, loading, router, requireOnboarding])

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null
  }

  // Don't render if onboarding check fails
  if (requireOnboarding && user && !user.onboardingCompleted) {
    return null
  }

  if (!requireOnboarding && user && user.onboardingCompleted && window.location.pathname === '/onboarding') {
    return null
  }

  return <>{children}</>
}
