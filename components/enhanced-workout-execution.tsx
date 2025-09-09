"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle, 
  Timer,
  Dumbbell,
  Plus,
  Minus,
  Save,
  Trophy,
  Target,
  Clock
} from "lucide-react"
import Link from "next/link"
import { workoutTracker, type WorkoutSession, type ExerciseSession, type WorkoutSet } from "@/lib/workout-tracking"
import { ExerciseDatabase } from "@/lib/exercise-database"

interface EnhancedWorkoutExecutionProps {
  workoutId?: string
  templateId?: string
}

export function EnhancedWorkoutExecution({ workoutId, templateId }: EnhancedWorkoutExecutionProps) {
  const [workout, setWorkout] = useState<WorkoutSession | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [restTimer, setRestTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [workoutStarted, setWorkoutStarted] = useState(false)
  const [showPersonalRecords, setShowPersonalRecords] = useState(false)

  useEffect(() => {
    // Load or start workout
    let currentWorkout = workoutTracker.getCurrentWorkout()
    
    if (!currentWorkout && templateId) {
      // Start new workout from template
      currentWorkout = workoutTracker.startWorkout(templateId)
    }
    
    if (currentWorkout) {
      setWorkout(currentWorkout)
      setWorkoutStarted(true)
    }
  }, [templateId])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((timer) => {
          if (timer <= 1) {
            setIsTimerRunning(false)
            setIsResting(false)
            return 0
          }
          return timer - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, restTimer])

  const startWorkout = () => {
    if (!workout && templateId) {
      const newWorkout = workoutTracker.startWorkout(templateId)
      setWorkout(newWorkout)
    }
    setWorkoutStarted(true)
  }

  const updateSet = (exerciseSessionId: string, setId: string, updates: Partial<WorkoutSet>) => {
    if (workoutTracker.updateSet(exerciseSessionId, setId, updates)) {
      const updatedWorkout = workoutTracker.getCurrentWorkout()
      setWorkout(updatedWorkout)
    }
  }

  const addSet = (exerciseSessionId: string) => {
    if (workoutTracker.addSetToExercise(exerciseSessionId)) {
      const updatedWorkout = workoutTracker.getCurrentWorkout()
      setWorkout(updatedWorkout)
    }
  }

  const removeSet = (exerciseSessionId: string, setId: string) => {
    if (workoutTracker.removeSet(exerciseSessionId, setId)) {
      const updatedWorkout = workoutTracker.getCurrentWorkout()
      setWorkout(updatedWorkout)
    }
  }

  const startRest = (duration: number = 60) => {
    setIsResting(true)
    setRestTimer(duration)
    setIsTimerRunning(true)
  }

  const completeExercise = () => {
    const nextIndex = currentExerciseIndex + 1
    if (nextIndex < (workout?.exercises.length || 0)) {
      // Start rest timer for next exercise
      const currentExercise = workout?.exercises[currentExerciseIndex]
      if (currentExercise?.sets[0]?.restTime) {
        startRest(currentExercise.sets[0].restTime)
      }
      setCurrentExerciseIndex(nextIndex)
    } else {
      // Workout completed
      completeWorkout()
    }
  }

  const completeWorkout = () => {
    if (workout) {
      const completedWorkout = workoutTracker.completeWorkout()
      if (completedWorkout) {
        // Redirect to dashboard with success
        window.location.href = '/dashboard?workout=completed'
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getCurrentExercise = (): ExerciseSession | null => {
    return workout?.exercises[currentExerciseIndex] || null
  }

  const getProgress = (): number => {
    if (!workout) return 0
    return ((currentExerciseIndex + 1) / workout.exercises.length) * 100
  }

  const getPersonalRecords = (exerciseId: string) => {
    return workoutTracker.getPersonalRecords().filter(pr => pr.exerciseId === exerciseId)
  }

  if (!workout && !templateId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No workout found. Please select a workout template.</p>
            <Link href="/workouts">
              <Button className="mt-4">Browse Workouts</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

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
    const template = workout.templateId ? ExerciseDatabase.getWorkoutTemplateById(workout.templateId) : null
    
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
              {template?.description || 'Custom workout session'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-sans text-2xl font-bold text-primary">{template?.duration || 30}</div>
                <div className="font-serif text-sm text-muted-foreground">minutes</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-bold text-secondary">{workout.exercises.length}</div>
                <div className="font-serif text-sm text-muted-foreground">exercises</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-bold text-accent capitalize">{template?.difficulty || 'custom'}</div>
                <div className="font-serif text-sm text-muted-foreground">level</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-sans font-semibold">Exercises:</h3>
              <div className="grid gap-2">
                {workout.exercises.map((exerciseSession, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-sans text-sm font-medium">{exerciseSession.exercise.name}</div>
                      <div className="font-serif text-xs text-muted-foreground">
                        {exerciseSession.sets.length} sets
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {exerciseSession.exercise.category}
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

  const currentExercise = getCurrentExercise()

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl">
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
          <Progress value={getProgress()} className="h-2" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Exercise Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rest Timer */}
            {isResting && (
              <Card className="border-accent">
                <CardContent className="p-6 text-center">
                  <Timer className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h2 className="font-sans text-2xl font-bold mb-2">Rest Time</h2>
                  <div className="font-mono text-4xl font-bold text-primary mb-4">
                    {formatTime(restTimer)}
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={() => setIsTimerRunning(!isTimerRunning)} 
                      variant="outline"
                    >
                      {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button onClick={() => { setIsResting(false); setIsTimerRunning(false); }}>
                      <SkipForward className="mr-2 h-4 w-4" />
                      Skip Rest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Current Exercise */}
            {!isResting && currentExercise && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans text-xl flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-primary" />
                    {currentExercise.exercise.name}
                  </CardTitle>
                  <CardDescription className="font-serif">
                    {currentExercise.exercise.description}
                  </CardDescription>
                  <div className="flex gap-2">
                    {currentExercise.exercise.muscleGroups.map(muscle => (
                      <Badge key={muscle} variant="secondary" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Instructions */}
                  <div className="space-y-3">
                    <h3 className="font-sans font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Instructions:
                    </h3>
                    <ol className="space-y-2">
                      {currentExercise.exercise.instructions.map((instruction, index) => (
                        <li key={index} className="font-serif text-sm flex items-start">
                          <span className="font-sans font-bold text-primary mr-2">{index + 1}.</span>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Sets Tracking */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans font-semibold">Track Your Sets</h3>
                      <Button 
                        onClick={() => addSet(currentExercise.id)} 
                        variant="outline" 
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Set
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {currentExercise.sets.map((set, setIndex) => (
                        <div key={set.id} className="grid grid-cols-12 gap-3 p-3 border rounded-lg">
                          <div className="col-span-1 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                              {set.setNumber}
                            </div>
                          </div>
                          
                          {currentExercise.exercise.category === 'strength' && (
                            <>
                              <div className="col-span-2">
                                <Label className="text-xs">Reps</Label>
                                <Input 
                                  type="number" 
                                  value={set.reps || ''} 
                                  onChange={(e) => updateSet(currentExercise.id, set.id, { 
                                    reps: parseInt(e.target.value) || 0 
                                  })}
                                  className="h-8"
                                />
                              </div>
                              <div className="col-span-3">
                                <Label className="text-xs">Weight (kg)</Label>
                                <Input 
                                  type="number" 
                                  value={set.weight || ''} 
                                  onChange={(e) => updateSet(currentExercise.id, set.id, { 
                                    weight: parseFloat(e.target.value) || 0 
                                  })}
                                  className="h-8"
                                  step="0.5"
                                />
                              </div>
                            </>
                          )}

                          {currentExercise.exercise.category === 'cardio' && (
                            <div className="col-span-3">
                              <Label className="text-xs">Duration (min)</Label>
                              <Input 
                                type="number" 
                                value={set.duration ? Math.round(set.duration / 60) : ''} 
                                onChange={(e) => updateSet(currentExercise.id, set.id, { 
                                  duration: (parseInt(e.target.value) || 0) * 60 
                                })}
                                className="h-8"
                              />
                            </div>
                          )}

                          <div className="col-span-2">
                            <Label className="text-xs">RPE (1-10)</Label>
                            <Input 
                              type="number" 
                              value={set.rpe || ''} 
                              onChange={(e) => updateSet(currentExercise.id, set.id, { 
                                rpe: parseInt(e.target.value) || undefined 
                              })}
                              className="h-8"
                              min="1"
                              max="10"
                            />
                          </div>

                          <div className="col-span-2 flex items-end gap-1">
                            <Button
                              variant={set.completed ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateSet(currentExercise.id, set.id, { 
                                completed: !set.completed 
                              })}
                              className="h-8"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm" 
                              onClick={() => removeSet(currentExercise.id, set.id)}
                              disabled={currentExercise.sets.length <= 1}
                              className="h-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>

                          {set.completed && (
                            <div className="col-span-1 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exercise Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => startRest(currentExercise.sets[0]?.restTime || 60)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Timer className="mr-2 h-4 w-4" />
                      Start Rest ({currentExercise.sets[0]?.restTime || 60}s)
                    </Button>
                    <Button
                      onClick={completeExercise}
                      className="flex-1 gradient-primary text-white hover:opacity-90"
                      disabled={!currentExercise.sets.some(set => set.completed)}
                    >
                      {currentExerciseIndex === workout.exercises.length - 1 ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Finish Workout
                        </>
                      ) : (
                        <>
                          <SkipForward className="mr-2 h-4 w-4" />
                          Next Exercise
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Personal Records */}
            {currentExercise && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans text-lg flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Personal Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getPersonalRecords(currentExercise.exerciseId).slice(0, 3).map((record, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                      <div>
                        <div className="font-sans font-medium text-sm capitalize">
                          {record.type.replace('_', ' ')}
                        </div>
                        <div className="font-serif text-xs text-muted-foreground">
                          {record.date.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-sans font-bold text-accent">
                          {record.value}
                          {record.type.includes('weight') && 'kg'}
                          {record.type.includes('duration') && 's'}
                        </div>
                      </div>
                    </div>
                  ))}
                  {getPersonalRecords(currentExercise.exerciseId).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Complete sets to track personal records!
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Workout Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Workout Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="font-sans text-2xl font-bold text-primary">
                    {Math.round((new Date().getTime() - workout.startTime.getTime()) / (1000 * 60))}
                  </div>
                  <div className="font-serif text-sm text-muted-foreground">minutes elapsed</div>
                </div>
                
                <div className="space-y-2">
                  {workout.exercises.map((exercise, index) => (
                    <div 
                      key={exercise.id} 
                      className={`p-2 rounded flex items-center justify-between ${
                        index === currentExerciseIndex 
                          ? 'bg-primary/10 border border-primary/20' 
                          : index < currentExerciseIndex 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-muted/30'
                      }`}
                    >
                      <span className="font-sans text-sm">{exercise.exercise.name}</span>
                      {index < currentExerciseIndex && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {index === currentExerciseIndex && (
                        <Badge variant="default" className="text-xs">Current</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
