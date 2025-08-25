"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Clock, Dumbbell, CheckCircle, Calendar, Play } from "lucide-react"
import { useEffect, useState } from "react"
import { UserStore, type UserProfile } from "@/lib/user-store"
import Link from "next/link"

interface WorkoutHistoryEntry {
  id: string
  name: string
  date: string
  duration: number
  exercises: number
  calories: number
  completed: boolean
  type: string
}

// Generate mock workout history
const generateWorkoutHistory = (userCreatedAt: string): WorkoutHistoryEntry[] => {
  const history: WorkoutHistoryEntry[] = []
  const createdDate = new Date(userCreatedAt)
  const today = new Date()
  
  const workoutTypes = [
    { name: 'Fat Burning Circuit', type: 'cardio', duration: 35, exercises: 6, calories: 320 },
    { name: 'Strength Builder', type: 'strength', duration: 50, exercises: 8, calories: 280 },
    { name: 'Endurance Booster', type: 'endurance', duration: 40, exercises: 7, calories: 350 },
    { name: 'Upper Body Focus', type: 'strength', duration: 45, exercises: 6, calories: 270 },
    { name: 'HIIT Blast', type: 'cardio', duration: 25, exercises: 5, calories: 400 }
  ]
  
  // Generate entries for the last 2 weeks
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Skip some days to make it realistic
    if (Math.random() > 0.6) continue
    
    const workout = workoutTypes[Math.floor(Math.random() * workoutTypes.length)]
    const completed = Math.random() > 0.1 // 90% completion rate
    
    history.push({
      id: `workout_${date.getTime()}_${Math.random().toString(36).substr(2, 9)}`,
      name: workout.name,
      date: date.toISOString(),
      duration: workout.duration,
      exercises: workout.exercises,
      calories: workout.calories,
      completed,
      type: workout.type
    })
  }
  
  return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function WorkoutHistory() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistoryEntry[]>([])

  useEffect(() => {
    const userData = UserStore.getUser()
    setUser(userData)
    
    if (userData) {
      const history = generateWorkoutHistory(userData.createdAt)
      setWorkoutHistory(history)
    }
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cardio':
        return 'bg-red-100 text-red-700'
      case 'strength':
        return 'bg-blue-100 text-blue-700'
      case 'endurance':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const completedWorkouts = workoutHistory.filter(w => w.completed).length
  const totalCaloriesBurned = workoutHistory.reduce((sum, w) => sum + (w.completed ? w.calories : 0), 0)
  const averageDuration = workoutHistory.filter(w => w.completed)
    .reduce((sum, w, _, arr) => sum + w.duration / arr.length, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-sans text-xl flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Workout History
          </CardTitle>
          <Link href="/workouts">
            <Button variant="outline" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Start Workout
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-primary/10">
              <div className="font-sans text-lg font-bold text-primary">{completedWorkouts}</div>
              <div className="font-serif text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-secondary/10">
              <div className="font-sans text-lg font-bold text-secondary">{totalCaloriesBurned}</div>
              <div className="font-serif text-xs text-muted-foreground">Calories</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-accent/10">
              <div className="font-sans text-lg font-bold text-accent">{Math.round(averageDuration)}</div>
              <div className="font-serif text-xs text-muted-foreground">Avg Min</div>
            </div>
          </div>

          {/* Workout List */}
          <div className="space-y-3">
            {workoutHistory.length > 0 ? (
              workoutHistory.slice(0, 8).map((workout) => (
                <div 
                  key={workout.id}
                  className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
                    workout.completed 
                      ? 'border-primary/20 bg-primary/5' 
                      : 'border-muted bg-muted/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-sans font-medium text-sm ${
                          workout.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {workout.name}
                        </h3>
                        <Badge className={`text-xs ${getTypeColor(workout.type)}`}>
                          {workout.type}
                        </Badge>
                        {workout.completed && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-serif">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(workout.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Dumbbell className="h-3 w-3" />
                          <span>{workout.exercises} exercises</span>
                        </div>
                        {workout.completed && (
                          <div className="font-medium text-primary">
                            {workout.calories} cal
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-sans text-xs font-medium ${
                        workout.completed ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        {workout.completed ? 'Completed' : 'Incomplete'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Dumbbell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-serif text-sm text-muted-foreground">
                  No workout history yet. Complete your first workout!
                </p>
                <Link href="/workouts">
                  <Button className="mt-3 gradient-primary text-white">
                    Start Your First Workout
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* View More */}
          {workoutHistory.length > 8 && (
            <div className="text-center">
              <Button variant="outline" size="sm">
                View More History
              </Button>
            </div>
          )}

          {/* Encouragement */}
          {completedWorkouts > 0 && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="text-center">
                <p className="font-serif text-xs text-muted-foreground">
                  {completedWorkouts >= 10 
                    ? "🎉 Amazing consistency! Keep up the great work!"
                    : completedWorkouts >= 5 
                    ? "💪 You're building a great habit!"
                    : "🚀 Great start on your fitness journey!"
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
