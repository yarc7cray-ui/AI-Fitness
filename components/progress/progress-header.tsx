"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { UserStore, ProgressTracker, type UserProfile } from "@/lib/user-store"

export function ProgressHeader() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [streak, setStreak] = useState(0)
  const [totalWorkouts, setTotalWorkouts] = useState(0)

  useEffect(() => {
    const userData = UserStore.getUser()
    setUser(userData)
    
    // Calculate streak and stats
    if (userData) {
      const daysSinceCreated = Math.floor(
        (Date.now() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      setStreak(Math.min(daysSinceCreated + 1, 12)) // Mock streak
      
      // Mock total workouts based on days since creation
      setTotalWorkouts(Math.floor(daysSinceCreated * 0.6))
    }
  }, [])

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{streak} Day Streak</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              <span>{totalWorkouts} Workouts</span>
            </Badge>
          </div>
        </div>
        
        <div>
          <h1 className="font-sans text-3xl font-bold text-foreground mb-2">
            Your <span className="gradient-text">Progress</span>
          </h1>
          <p className="font-serif text-muted-foreground">
            Track your fitness journey and celebrate your achievements
          </p>
        </div>
      </div>
    </header>
  )
}
