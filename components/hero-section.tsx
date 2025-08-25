"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

export function HeroSection() {
  const { data: session, status } = useSession()
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-muted">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Your AI Coach – <span className="gradient-text">Train Smarter</span>,{" "}
            <span className="gradient-text">Live Stronger</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-8 text-muted-foreground sm:text-xl">
            Get personalized AI-powered workouts, nutrition plans, and join a community of fitness enthusiasts.
            Everything you need to reach your goals, completely free.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            {status === "loading" ? (
              <Button size="lg" disabled className="gradient-primary text-white">
                Loading...
              </Button>
            ) : session ? (
              <Link href={(session.user as any)?.onboardingCompleted ? "/dashboard" : "/onboarding"}>
                <Button size="lg" className="gradient-primary text-white hover:opacity-90">
                  {(session.user as any)?.onboardingCompleted ? "Go to Dashboard" : "Complete Setup"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button size="lg" className="gradient-primary text-white hover:opacity-90">
                    Start Free Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="outline" size="lg" className="bg-transparent">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            <Button variant="outline" size="lg" className="group bg-transparent">
              <Play className="mr-2 h-4 w-4 group-hover:text-primary" />
              Watch Demo
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>AI-Powered Coaching</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Active Community</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Video Placeholder */}
        <div className="mt-16 relative">
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-2xl bg-card p-2 shadow-2xl">
              <img
                src="/modern-fitness-app-dashboard-with-workout-tracking.png"
                alt="Coach Online Dashboard Preview"
                className="w-full rounded-xl"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
