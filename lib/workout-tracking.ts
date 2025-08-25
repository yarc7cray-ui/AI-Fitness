import { Exercise, WorkoutTemplate, ExerciseDatabase } from './exercise-database'

export interface WorkoutSet {
  id: string
  setNumber: number
  reps?: number
  weight?: number // kg
  duration?: number // seconds for time-based exercises
  distance?: number // meters for cardio
  completed: boolean
  restTime?: number // seconds
  notes?: string
  difficulty?: 'easy' | 'moderate' | 'hard'
  rpe?: number // Rate of Perceived Exertion (1-10)
}

export interface ExerciseSession {
  id: string
  exerciseId: string
  exercise: Exercise
  sets: WorkoutSet[]
  totalVolume?: number // total weight x reps
  totalTime?: number // total duration in seconds
  personalRecord?: boolean
  notes?: string
  startTime?: Date
  endTime?: Date
}

export interface WorkoutSession {
  id: string
  name: string
  templateId?: string
  userId: string
  startTime: Date
  endTime?: Date
  exercises: ExerciseSession[]
  totalDuration?: number // minutes
  totalCalories?: number
  difficulty?: 'easy' | 'moderate' | 'hard'
  mood?: 'poor' | 'okay' | 'good' | 'great'
  notes?: string
  completed: boolean
}

export interface PersonalRecord {
  exerciseId: string
  type: 'max_weight' | 'max_reps' | 'max_volume' | 'longest_duration' | 'fastest_time'
  value: number
  date: Date
  workoutSessionId: string
}

export interface WorkoutProgress {
  exerciseId: string
  date: Date
  volume?: number
  maxWeight?: number
  totalReps?: number
  duration?: number
  averageRpe?: number
}

// Workout Tracking Service
export class WorkoutTracker {
  private readonly STORAGE_KEYS = {
    CURRENT_WORKOUT: 'current_workout_session',
    WORKOUT_HISTORY: 'workout_history',
    PERSONAL_RECORDS: 'personal_records',
    WORKOUT_PROGRESS: 'workout_progress'
  }

  // Current workout session management
  startWorkout(templateId?: string, customName?: string): WorkoutSession {
    const template = templateId ? ExerciseDatabase.getWorkoutTemplateById(templateId) : null
    
    const workout: WorkoutSession = {
      id: `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: customName || template?.name || 'Custom Workout',
      templateId,
      userId: 'current_user', // In real app, get from auth
      startTime: new Date(),
      exercises: [],
      completed: false
    }

    // Pre-populate exercises from template
    if (template) {
      workout.exercises = template.exercises.map((templateExercise, index) => {
        const exercise = ExerciseDatabase.getExerciseById(templateExercise.exerciseId)
        if (!exercise) throw new Error(`Exercise not found: ${templateExercise.exerciseId}`)

        return {
          id: `exercise_session_${index}_${Date.now()}`,
          exerciseId: exercise.id,
          exercise,
          sets: this.generateSetsFromTemplate(templateExercise, exercise)
        }
      })
    }

    this.saveCurrentWorkout(workout)
    return workout
  }

  private generateSetsFromTemplate(templateExercise: any, exercise: Exercise): WorkoutSet[] {
    const sets: WorkoutSet[] = []
    const numSets = templateExercise.sets || exercise.sets || 3

    for (let i = 0; i < numSets; i++) {
      sets.push({
        id: `set_${i}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        setNumber: i + 1,
        reps: this.parseReps(templateExercise.reps || exercise.reps),
        weight: 0,
        duration: templateExercise.duration || exercise.duration,
        completed: false,
        restTime: templateExercise.restTime || exercise.restTime || 60
      })
    }

    return sets
  }

  private parseReps(repsString?: string): number {
    if (!repsString) return 10
    if (repsString.includes('-')) {
      const [min] = repsString.split('-').map(Number)
      return min
    }
    return parseInt(repsString) || 10
  }

  getCurrentWorkout(): WorkoutSession | null {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(this.STORAGE_KEYS.CURRENT_WORKOUT)
    if (!stored) return null
    
    try {
      const workout = JSON.parse(stored)
      // Convert date strings back to Date objects
      workout.startTime = new Date(workout.startTime)
      if (workout.endTime) workout.endTime = new Date(workout.endTime)
      return workout
    } catch {
      return null
    }
  }

  private saveCurrentWorkout(workout: WorkoutSession): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEYS.CURRENT_WORKOUT, JSON.stringify(workout))
  }

  // Exercise and set management
  addExerciseToWorkout(exerciseId: string): ExerciseSession | null {
    const currentWorkout = this.getCurrentWorkout()
    if (!currentWorkout) return null

    const exercise = ExerciseDatabase.getExerciseById(exerciseId)
    if (!exercise) return null

    const exerciseSession: ExerciseSession = {
      id: `exercise_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      exerciseId: exercise.id,
      exercise,
      sets: this.generateDefaultSets(exercise)
    }

    currentWorkout.exercises.push(exerciseSession)
    this.saveCurrentWorkout(currentWorkout)
    return exerciseSession
  }

  private generateDefaultSets(exercise: Exercise): WorkoutSet[] {
    const numSets = exercise.sets || 3
    const sets: WorkoutSet[] = []

    for (let i = 0; i < numSets; i++) {
      sets.push({
        id: `set_${i}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        setNumber: i + 1,
        reps: this.parseReps(exercise.reps),
        weight: 0,
        duration: exercise.duration,
        completed: false,
        restTime: exercise.restTime || 60
      })
    }

    return sets
  }

  addSetToExercise(exerciseSessionId: string): WorkoutSet | null {
    const currentWorkout = this.getCurrentWorkout()
    if (!currentWorkout) return null

    const exerciseSession = currentWorkout.exercises.find(ex => ex.id === exerciseSessionId)
    if (!exerciseSession) return null

    const newSet: WorkoutSet = {
      id: `set_${exerciseSession.sets.length}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      setNumber: exerciseSession.sets.length + 1,
      reps: exerciseSession.sets[0]?.reps || 10,
      weight: exerciseSession.sets[exerciseSession.sets.length - 1]?.weight || 0,
      completed: false,
      restTime: exerciseSession.exercise.restTime || 60
    }

    exerciseSession.sets.push(newSet)
    this.saveCurrentWorkout(currentWorkout)
    return newSet
  }

  updateSet(exerciseSessionId: string, setId: string, updates: Partial<WorkoutSet>): boolean {
    const currentWorkout = this.getCurrentWorkout()
    if (!currentWorkout) return false

    const exerciseSession = currentWorkout.exercises.find(ex => ex.id === exerciseSessionId)
    if (!exerciseSession) return false

    const setIndex = exerciseSession.sets.findIndex(set => set.id === setId)
    if (setIndex === -1) return false

    exerciseSession.sets[setIndex] = { ...exerciseSession.sets[setIndex], ...updates }
    this.saveCurrentWorkout(currentWorkout)
    return true
  }

  removeSet(exerciseSessionId: string, setId: string): boolean {
    const currentWorkout = this.getCurrentWorkout()
    if (!currentWorkout) return false

    const exerciseSession = currentWorkout.exercises.find(ex => ex.id === exerciseSessionId)
    if (!exerciseSession) return false

    exerciseSession.sets = exerciseSession.sets.filter(set => set.id !== setId)
    
    // Renumber remaining sets
    exerciseSession.sets.forEach((set, index) => {
      set.setNumber = index + 1
    })

    this.saveCurrentWorkout(currentWorkout)
    return true
  }

  // Workout completion
  completeWorkout(): WorkoutSession | null {
    const currentWorkout = this.getCurrentWorkout()
    if (!currentWorkout) return null

    currentWorkout.endTime = new Date()
    currentWorkout.completed = true
    currentWorkout.totalDuration = Math.round(
      (currentWorkout.endTime.getTime() - currentWorkout.startTime.getTime()) / (1000 * 60)
    )

    // Calculate totals
    this.calculateWorkoutTotals(currentWorkout)

    // Save to history
    this.saveWorkoutToHistory(currentWorkout)

    // Update personal records
    this.updatePersonalRecords(currentWorkout)

    // Update progress tracking
    this.updateProgress(currentWorkout)

    // Clear current workout
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEYS.CURRENT_WORKOUT)
    }

    return currentWorkout
  }

  private calculateWorkoutTotals(workout: WorkoutSession): void {
    let totalCalories = 0

    workout.exercises.forEach(exerciseSession => {
      // Calculate volume for strength exercises
      if (exerciseSession.exercise.category === 'strength') {
        exerciseSession.totalVolume = exerciseSession.sets.reduce((total, set) => {
          if (set.completed && set.reps && set.weight) {
            return total + (set.reps * set.weight)
          }
          return total
        }, 0)
      }

      // Calculate time for duration-based exercises
      if (exerciseSession.exercise.category === 'cardio') {
        exerciseSession.totalTime = exerciseSession.sets.reduce((total, set) => {
          if (set.completed && set.duration) {
            return total + set.duration
          }
          return total
        }, 0)

        // Estimate calories for cardio
        if (exerciseSession.totalTime && exerciseSession.exercise.calories_per_minute) {
          totalCalories += (exerciseSession.totalTime / 60) * exerciseSession.exercise.calories_per_minute
        }
      }
    })

    workout.totalCalories = Math.round(totalCalories)
  }

  // Progress tracking
  private updateProgress(workout: WorkoutSession): void {
    const progressData = this.getProgressData()
    const today = new Date().toISOString().split('T')[0]

    workout.exercises.forEach(exerciseSession => {
      if (!exerciseSession.sets.some(set => set.completed)) return

      const progress: WorkoutProgress = {
        exerciseId: exerciseSession.exerciseId,
        date: new Date(),
        volume: exerciseSession.totalVolume,
        maxWeight: Math.max(...exerciseSession.sets.map(set => set.weight || 0)),
        totalReps: exerciseSession.sets.reduce((total, set) => 
          set.completed ? total + (set.reps || 0) : total, 0
        ),
        duration: exerciseSession.totalTime,
        averageRpe: this.calculateAverageRpe(exerciseSession.sets)
      }

      const existingIndex = progressData.findIndex(p => 
        p.exerciseId === progress.exerciseId && 
        p.date.toISOString().split('T')[0] === today
      )

      if (existingIndex >= 0) {
        progressData[existingIndex] = progress
      } else {
        progressData.push(progress)
      }
    })

    this.saveProgressData(progressData)
  }

  private calculateAverageRpe(sets: WorkoutSet[]): number {
    const rpeValues = sets.filter(set => set.completed && set.rpe).map(set => set.rpe!)
    return rpeValues.length > 0 ? rpeValues.reduce((sum, rpe) => sum + rpe, 0) / rpeValues.length : 0
  }

  // Personal records
  private updatePersonalRecords(workout: WorkoutSession): void {
    const personalRecords = this.getPersonalRecords()

    workout.exercises.forEach(exerciseSession => {
      if (!exerciseSession.sets.some(set => set.completed)) return

      const exerciseId = exerciseSession.exerciseId
      
      // Check for new max weight
      const maxWeight = Math.max(...exerciseSession.sets.map(set => set.weight || 0))
      if (maxWeight > 0) {
        this.checkAndUpdateRecord(personalRecords, exerciseId, 'max_weight', maxWeight, workout.id)
      }

      // Check for new max reps
      const maxReps = Math.max(...exerciseSession.sets.map(set => set.reps || 0))
      if (maxReps > 0) {
        this.checkAndUpdateRecord(personalRecords, exerciseId, 'max_reps', maxReps, workout.id)
      }

      // Check for new max volume
      if (exerciseSession.totalVolume && exerciseSession.totalVolume > 0) {
        this.checkAndUpdateRecord(personalRecords, exerciseId, 'max_volume', exerciseSession.totalVolume, workout.id)
      }

      // Check for longest duration
      if (exerciseSession.totalTime && exerciseSession.totalTime > 0) {
        this.checkAndUpdateRecord(personalRecords, exerciseId, 'longest_duration', exerciseSession.totalTime, workout.id)
      }
    })

    this.savePersonalRecords(personalRecords)
  }

  private checkAndUpdateRecord(
    records: PersonalRecord[], 
    exerciseId: string, 
    type: PersonalRecord['type'], 
    value: number, 
    workoutId: string
  ): void {
    const existingRecord = records.find(r => r.exerciseId === exerciseId && r.type === type)
    
    if (!existingRecord || value > existingRecord.value) {
      const recordIndex = records.findIndex(r => r.exerciseId === exerciseId && r.type === type)
      const newRecord: PersonalRecord = {
        exerciseId,
        type,
        value,
        date: new Date(),
        workoutSessionId: workoutId
      }

      if (recordIndex >= 0) {
        records[recordIndex] = newRecord
      } else {
        records.push(newRecord)
      }
    }
  }

  // Data persistence helpers
  getWorkoutHistory(): WorkoutSession[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.WORKOUT_HISTORY)
    if (!stored) return []
    
    try {
      const history = JSON.parse(stored)
      return history.map((workout: any) => ({
        ...workout,
        startTime: new Date(workout.startTime),
        endTime: workout.endTime ? new Date(workout.endTime) : undefined
      }))
    } catch {
      return []
    }
  }

  private saveWorkoutToHistory(workout: WorkoutSession): void {
    if (typeof window === 'undefined') return
    const history = this.getWorkoutHistory()
    history.unshift(workout) // Add to beginning
    
    // Keep only last 100 workouts
    const trimmedHistory = history.slice(0, 100)
    localStorage.setItem(this.STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(trimmedHistory))
  }

  getPersonalRecords(): PersonalRecord[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.PERSONAL_RECORDS)
    if (!stored) return []
    
    try {
      const records = JSON.parse(stored)
      return records.map((record: any) => ({
        ...record,
        date: new Date(record.date)
      }))
    } catch {
      return []
    }
  }

  private savePersonalRecords(records: PersonalRecord[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEYS.PERSONAL_RECORDS, JSON.stringify(records))
  }

  getProgressData(): WorkoutProgress[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.WORKOUT_PROGRESS)
    if (!stored) return []
    
    try {
      const progress = JSON.parse(stored)
      return progress.map((p: any) => ({
        ...p,
        date: new Date(p.date)
      }))
    } catch {
      return []
    }
  }

  private saveProgressData(progress: WorkoutProgress[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEYS.WORKOUT_PROGRESS, JSON.stringify(progress))
  }

  // Analytics and stats
  getExerciseProgress(exerciseId: string, days: number = 30): WorkoutProgress[] {
    const allProgress = this.getProgressData()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    return allProgress
      .filter(p => p.exerciseId === exerciseId && p.date >= cutoffDate)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  getWorkoutStats(days: number = 30): {
    totalWorkouts: number
    totalMinutes: number
    totalCalories: number
    averageWorkoutLength: number
    mostFrequentExercises: { exerciseId: string, count: number }[]
  } {
    const history = this.getWorkoutHistory()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const recentWorkouts = history.filter(w => 
      w.completed && w.startTime >= cutoffDate
    )

    const totalWorkouts = recentWorkouts.length
    const totalMinutes = recentWorkouts.reduce((sum, w) => sum + (w.totalDuration || 0), 0)
    const totalCalories = recentWorkouts.reduce((sum, w) => sum + (w.totalCalories || 0), 0)
    const averageWorkoutLength = totalWorkouts > 0 ? totalMinutes / totalWorkouts : 0

    // Count exercise frequency
    const exerciseCounts: { [key: string]: number } = {}
    recentWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        exerciseCounts[exercise.exerciseId] = (exerciseCounts[exercise.exerciseId] || 0) + 1
      })
    })

    const mostFrequentExercises = Object.entries(exerciseCounts)
      .map(([exerciseId, count]) => ({ exerciseId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return {
      totalWorkouts,
      totalMinutes,
      totalCalories,
      averageWorkoutLength,
      mostFrequentExercises
    }
  }
}

// Singleton instance
export const workoutTracker = new WorkoutTracker()
