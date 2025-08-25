"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Target, Droplets, Activity } from "lucide-react"
import { useEffect, useState } from "react"
import { NutritionTracker, type NutritionPlan, type DailyNutritionLog } from "@/lib/user-store"

export function DailyNutritionStats() {
  const [todaysLog, setTodaysLog] = useState<DailyNutritionLog | null>(null)
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null)

  useEffect(() => {
    // Load today's nutrition log
    const log = NutritionTracker.getTodaysLog()
    setTodaysLog(log)

    // Load nutrition plan
    const storedPlan = localStorage.getItem('current-nutrition-plan')
    if (storedPlan) {
      try {
        setNutritionPlan(JSON.parse(storedPlan))
      } catch (error) {
        console.error('Failed to parse nutrition plan:', error)
      }
    }
  }, [])

  if (!todaysLog || !nutritionPlan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg">Today&apos;s Nutrition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-4">
            Loading nutrition data&hellip;
          </div>
        </CardContent>
      </Card>
    )
  }

  const nutritionStats = [
    {
      label: "Calories",
      current: todaysLog.totalCalories,
      target: nutritionPlan.dailyCalories,
      unit: "kcal",
      icon: Flame,
      color: "text-orange-500",
      progress: (todaysLog.totalCalories / nutritionPlan.dailyCalories) * 100,
    },
    {
      label: "Protein",
      current: Math.round(todaysLog.totalMacros.protein),
      target: nutritionPlan.macros.protein,
      unit: "g",
      icon: Target,
      color: "text-primary",
      progress: (todaysLog.totalMacros.protein / nutritionPlan.macros.protein) * 100,
    },
    {
      label: "Carbs",
      current: Math.round(todaysLog.totalMacros.carbs),
      target: nutritionPlan.macros.carbs,
      unit: "g",
      icon: Activity,
      color: "text-accent",
      progress: (todaysLog.totalMacros.carbs / nutritionPlan.macros.carbs) * 100,
    },
    {
      label: "Water",
      current: Math.round(todaysLog.waterIntake / 250), // Convert ml to glasses (250ml each)
      target: 8,
      unit: "glasses",
      icon: Droplets,
      color: "text-blue-500",
      progress: (todaysLog.waterIntake / 2000) * 100, // 2000ml target
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg">Today&apos;s Nutrition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {nutritionStats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="font-serif text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-sans text-lg font-bold">{stat.current}</span>
                  <span className="font-serif text-xs text-muted-foreground">
                    / {stat.target} {stat.unit}
                  </span>
                </div>
                <Progress value={Math.min(stat.progress, 100)} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
