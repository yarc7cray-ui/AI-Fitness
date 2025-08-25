"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Dumbbell, Apple, Play } from "lucide-react"
import { useEffect, useState } from "react"
import { type WorkoutPlan, type NutritionPlan } from "@/lib/user-store"
import Link from "next/link"

export function TodaysPlan() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null)

  useEffect(() => {
    // Load generated plans from localStorage
    const storedWorkout = localStorage.getItem('current-workout-plan')
    const storedNutrition = localStorage.getItem('current-nutrition-plan')
    
    if (storedWorkout) {
      try {
        setWorkoutPlan(JSON.parse(storedWorkout))
      } catch (error) {
        console.error('Failed to parse workout plan:', error)
      }
    }
    
    if (storedNutrition) {
      try {
        setNutritionPlan(JSON.parse(storedNutrition))
      } catch (error) {
        console.error('Failed to parse nutrition plan:', error)
      }
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-xl flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Today&apos;s Plan
        </CardTitle>
        <CardDescription className="font-serif">
          Your AI coach has prepared a personalized plan for today
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Workout Plan */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-foreground">
              {workoutPlan?.name || 'Loading Workout...'}
            </h3>
            <p className="font-serif text-sm text-muted-foreground mb-2">
              {workoutPlan ? `${workoutPlan.duration} min • ${workoutPlan.exercises.length} exercises • ${workoutPlan.difficulty} level` : 'Generating your personalized workout...'}
            </p>
            {workoutPlan && (
              <>
                <div className="flex flex-wrap gap-2 mb-3">
                  {workoutPlan.exercises.slice(0, 3).map((exercise, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {exercise.name}
                    </Badge>
                  ))}
                  {workoutPlan.exercises.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{workoutPlan.exercises.length - 3} more
                    </Badge>
                  )}
                </div>
                <Link href={`/workout/${workoutPlan.id}`}>
                  <Button size="sm" className="gradient-primary text-white hover:opacity-90">
                    <Play className="mr-2 h-3 w-3" />
                    Start Workout
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Nutrition Plan */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
            <Apple className="h-5 w-5 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-foreground">
              {nutritionPlan?.name || 'Loading Nutrition...'}
            </h3>
            <p className="font-serif text-sm text-muted-foreground mb-2">
              {nutritionPlan ? `Optimized for your goals • ${nutritionPlan.dailyCalories.toLocaleString()} calories` : 'Calculating your nutrition needs...'}
            </p>
            {nutritionPlan && (
              <div className="grid grid-cols-3 gap-2 text-xs font-serif">
                {nutritionPlan.meals.map((meal, index) => (
                  <div key={index} className="text-center p-2 bg-background rounded">
                    <div className="font-semibold capitalize">{meal.type}</div>
                    <div className="text-muted-foreground">{meal.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
