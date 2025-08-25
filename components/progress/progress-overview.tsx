"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Target, 
  Flame, 
  Calendar,
  Dumbbell,
  Apple,
  Trophy,
  Activity
} from "lucide-react"
import { useEffect, useState } from "react"
import { UserStore, NutritionTracker, ProgressTracker, type UserProfile } from "@/lib/user-store"

interface ProgressStat {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  target?: string | number
  progress?: number
  color: string
  trend?: 'up' | 'down' | 'neutral'
  description: string
}

export function ProgressOverview() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<ProgressStat[]>([])

  useEffect(() => {
    const userData = UserStore.getUser()
    setUser(userData)

    if (userData) {
      const daysSinceCreated = Math.floor(
        (Date.now() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      
      // Get today's nutrition
      const todaysNutrition = NutritionTracker.getTodaysLog()
      
      // Get achievements
      const achievements = ProgressTracker.getAchievements()
      const unlockedCount = achievements.filter(a => a.unlockedAt).length

      const progressStats: ProgressStat[] = [
        {
          icon: Flame,
          label: "Current Streak",
          value: Math.min(daysSinceCreated + 1, 14),
          target: "30 days",
          progress: (Math.min(daysSinceCreated + 1, 14) / 30) * 100,
          color: "text-orange-500",
          trend: "up",
          description: "Keep going to reach your goal!"
        },
        {
          icon: Dumbbell,
          label: "Workouts This Month",
          value: Math.max(1, Math.floor(daysSinceCreated * 0.8)),
          target: "12 workouts",
          progress: (Math.max(1, Math.floor(daysSinceCreated * 0.8)) / 12) * 100,
          color: "text-primary",
          trend: "up",
          description: "Great consistency this month"
        },
        {
          icon: Target,
          label: "Goals Achieved",
          value: `${Math.floor(daysSinceCreated * 0.3)}`,
          target: "10 goals",
          progress: (Math.floor(daysSinceCreated * 0.3) / 10) * 100,
          color: "text-secondary",
          trend: "up",
          description: "You're making steady progress"
        },
        {
          icon: Apple,
          label: "Nutrition Score",
          value: todaysNutrition.totalCalories > 0 ? "85%" : "0%",
          color: "text-accent",
          trend: todaysNutrition.totalCalories > 0 ? "up" : "neutral",
          description: todaysNutrition.totalCalories > 0 ? "Good nutrition tracking today" : "Start logging your meals"
        },
        {
          icon: Trophy,
          label: "Achievements",
          value: `${unlockedCount}/${achievements.length}`,
          progress: (unlockedCount / achievements.length) * 100,
          color: "text-yellow-500",
          trend: unlockedCount > 0 ? "up" : "neutral",
          description: `${achievements.length - unlockedCount} more to unlock`
        },
        {
          icon: Activity,
          label: "Weekly Average",
          value: `${Math.max(1, Math.floor(daysSinceCreated * 0.4))} workouts`,
          color: "text-blue-500",
          trend: "up",
          description: "Consistent weekly performance"
        }
      ]

      setStats(progressStats)
    }
  }, [])

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case 'down':
        return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
      default:
        return <div className="w-3 h-3" />
    }
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="font-serif text-sm text-muted-foreground">{stat.label}</span>
                </div>
                {getTrendIcon(stat.trend)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-2xl font-bold">{stat.value}</span>
                  {stat.target && (
                    <span className="font-serif text-xs text-muted-foreground">
                      / {stat.target}
                    </span>
                  )}
                </div>
                
                {typeof stat.progress === 'number' && (
                  <Progress value={stat.progress} className="h-2" />
                )}
                
                <p className="font-serif text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg">Weekly Insights</CardTitle>
          <CardDescription className="font-serif">
            Your performance summary for this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <div className="font-sans text-2xl font-bold text-primary">
                {user ? Math.max(1, Math.floor(
                  (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24) * 0.7
                )) : 0}
              </div>
              <div className="font-serif text-sm text-muted-foreground">Workouts Completed</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-secondary/10">
              <div className="font-sans text-2xl font-bold text-secondary">
                {user ? Math.floor(Math.random() * 5) + 3 : 0}
              </div>
              <div className="font-serif text-sm text-muted-foreground">Days Active</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-accent/10">
              <div className="font-sans text-2xl font-bold text-accent">
                {user ? Math.floor(Math.random() * 500) + 1200 : 0}
              </div>
              <div className="font-serif text-sm text-muted-foreground">Avg Calories Burned</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
