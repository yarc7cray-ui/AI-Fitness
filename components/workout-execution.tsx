"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle, 
  Timer,
  Dumbbell,
  RotateCcw
} from "lucide-react"
import Link from "next/link"
import { type WorkoutPlan, type Exercise } from "@/lib/user-store"

interface WorkoutExecutionProps {
  workoutId: string
}

export function WorkoutExecution({ workoutId }: WorkoutExecutionProps) {
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([])
  const [workoutStarted, setWorkoutStarted] = useState(false)

  useEffect(() => {
    // Load workout from localStorage
    const storedWorkout = localStorage.getItem('current-workout-plan')
    if (storedWorkout) {
      try {
        const workoutData = JSON.parse(storedWorkout)
        setWorkout(workoutData)
        setCompletedExercises(new Array(workoutData.exercises.length).fill(false))
      } catch (error) {
        console.error('Failed to parse workout:', error)
      }
    }
  }, [workoutId])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => {
          if (timer <= 1) {
            setIsTimerRunning(false)
            return 0
          }
          return timer - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  const currentExercise = workout?.exercises[currentExerciseIndex]

  const startWorkout = () => {
    setWorkoutStarted(true)
  }

  const startRest = () => {
    if (currentExercise) {
      setIsResting(true)
      setTimer(currentExercise.restTime)
      setIsTimerRunning(true)
    }
  }

  const completeExercise = () => {
    const newCompleted = [...completedExercises]
    newCompleted[currentExerciseIndex] = true
    setCompletedExercises(newCompleted)
    
    if (currentExerciseIndex < (workout?.exercises.length || 0) - 1) {
      startRest()
    } else {
      // Workout completed
      completeWorkout()
    }
  }

  const nextExercise = () => {
    setIsResting(false)
    setIsTimerRunning(false)
    setTimer(0)
    
    if (currentExerciseIndex < (workout?.exercises.length || 0) - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    }
  }

  const completeWorkout = () => {
    // Save workout completion (in real app, this would go to database)
    const completion = {
      workoutId: workout?.id,
      completedAt: new Date().toISOString(),
      exercises: workout?.exercises.map((exercise, index) => ({
        exerciseId: exercise.id,
        completed: completedExercises[index]
      }))
    }
    
    localStorage.setItem('last-workout-completion', JSON.stringify(completion))
    
    // Redirect to dashboard with success message
    window.location.href = '/dashboard?workout=completed'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = workout ? ((currentExerciseIndex + 1) / workout.exercises.length) * 100 : 0

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Loading workout...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!workoutStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 self-start"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <CardTitle className="font-sans text-2xl">{workout.name}</CardTitle>
            <CardDescription className="font-serif">
              {workout.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-sans text-2xl font-bold text-primary">{workout.duration}</div>
                <div className="font-serif text-sm text-muted-foreground">minutes</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-bold text-secondary">{workout.exercises.length}</div>
                <div className="font-serif text-sm text-muted-foreground">exercises</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-bold text-accent capitalize">{workout.difficulty}</div>
                <div className="font-serif text-sm text-muted-foreground">level</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-sans font-semibold">Exercises:</h3>
              <div className="grid gap-2">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-sans text-sm font-medium">{exercise.name}</div>
                      <div className="font-serif text-xs text-muted-foreground">
                        {exercise.sets} sets × {exercise.reps}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {exercise.restTime}s rest
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={startWorkout}
              className="w-full gradient-primary text-white hover:opacity-90"
              size="lg"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Workout
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-sans text-xl font-bold">{workout.name}</h1>
            <Badge variant="outline">
              {currentExerciseIndex + 1} of {workout.exercises.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Rest Timer */}
        {isResting && (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <Timer className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="font-sans text-2xl font-bold mb-2">Rest Time</h2>
              <div className="font-mono text-4xl font-bold text-primary mb-4">
                {formatTime(timer)}
              </div>
              <Button onClick={nextExercise} className="gradient-primary text-white">
                <SkipForward className="mr-2 h-4 w-4" />
                Skip Rest
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Current Exercise */}
        {!isResting && currentExercise && (
          <Card>
            <CardHeader>
              <CardTitle className="font-sans text-xl flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                {currentExercise.name}
              </CardTitle>
              <CardDescription className="font-serif">
                {currentExercise.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="font-sans text-2xl font-bold text-primary">{currentExercise.sets}</div>
                  <div className="font-serif text-sm text-muted-foreground">sets</div>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <div className="font-sans text-2xl font-bold text-secondary">{currentExercise.reps}</div>
                  <div className="font-serif text-sm text-muted-foreground">reps</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-sans font-semibold">Instructions:</h3>
                <ol className="space-y-2">
                  {currentExercise.instructions.map((instruction, index) => (
                    <li key={index} className="font-serif text-sm flex items-start">
                      <span className="font-sans font-bold text-primary mr-2">{index + 1}.</span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={completeExercise}
                  className="flex-1 gradient-primary text-white hover:opacity-90"
                  size="lg"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {currentExerciseIndex === workout.exercises.length - 1 ? 'Finish Workout' : 'Complete Exercise'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
