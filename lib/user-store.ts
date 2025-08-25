export interface UserProfile {
  id: string
  name: string
  email?: string
  onboardingCompleted: boolean
  onboardingData: OnboardingData
  preferences: UserPreferences
  createdAt: string
  lastActive: string
}

export interface OnboardingData {
  goal: 'weight-loss' | 'muscle-gain' | 'endurance' | 'maintenance' | ''
  height: string // in cm
  weight: string // in kg
  age: string
  experience: 'beginner' | 'intermediate' | 'advanced' | ''
  equipment: string[] // ['gym', 'home-basic', 'bodyweight']
  daysPerWeek: string // '3' | '4' | '5' | '6+'
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
  units: 'metric' | 'imperial'
  language: 'en'
}

export interface WorkoutPlan {
  id: string
  name: string
  description: string
  duration: number // minutes
  exercises: Exercise[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  createdAt: string
}

export interface Exercise {
  id: string
  name: string
  description: string
  sets: number
  reps: string // e.g., "8-12" or "30 seconds"
  restTime: number // seconds
  equipment: string[]
  muscleGroups: string[]
  instructions: string[]
  videoUrl?: string
  imageUrl?: string
}

export interface NutritionPlan {
  id: string
  name: string
  dailyCalories: number
  macros: {
    protein: number // grams
    carbs: number // grams
    fats: number // grams
  }
  meals: Meal[]
  createdAt: string
}

export interface Meal {
  id: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  name: string
  calories: number
  macros: {
    protein: number
    carbs: number
    fats: number
  }
  ingredients: string[]
  instructions?: string[]
  imageUrl?: string
}

export interface ProgressEntry {
  id: string
  date: string
  type: 'workout' | 'nutrition' | 'weight' | 'measurements'
  data: Record<string, unknown>
}

export interface FoodItem {
  id: string
  name: string
  brand?: string
  category: 'protein' | 'carbs' | 'fats' | 'vegetables' | 'fruits' | 'dairy' | 'snacks' | 'beverages'
  calories: number // per 100g
  macros: {
    protein: number // grams per 100g
    carbs: number
    fats: number
    fiber?: number
    sugar?: number
  }
  commonServings: {
    name: string
    grams: number
  }[]
}

export interface LoggedFood {
  id: string
  foodId: string
  foodName: string
  servingSize: number // in grams
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  loggedAt: string
  calories: number
  macros: {
    protein: number
    carbs: number
    fats: number
  }
}

export interface DailyNutritionLog {
  date: string // YYYY-MM-DD
  foods: LoggedFood[]
  totalCalories: number
  totalMacros: {
    protein: number
    carbs: number
    fats: number
  }
  waterIntake: number // in ml
  notes?: string
}

export interface WeightEntry {
  id: string
  date: string
  weight: number // in kg
  notes?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'workout' | 'nutrition' | 'streak' | 'progress'
  unlockedAt?: string
  progress: number // 0-100
  target: number
}

// Local storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'coach-online-user-profile',
  WORKOUT_HISTORY: 'coach-online-workout-history',
  NUTRITION_LOG: 'coach-online-nutrition-log',
  PROGRESS_DATA: 'coach-online-progress-data',
  FOOD_DATABASE: 'coach-online-food-database',
  DAILY_LOGS: 'coach-online-daily-logs',
  WEIGHT_HISTORY: 'coach-online-weight-history',
  ACHIEVEMENTS: 'coach-online-achievements',
} as const

// User profile management
export class UserStore {
  static generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  static getUser(): UserProfile | null {
    if (typeof window === 'undefined') return null
    
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    if (!stored) return null
    
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('Failed to parse user profile:', error)
      return null
    }
  }

  static createUser(onboardingData: OnboardingData, name: string = 'User'): UserProfile {
    const userId = this.generateUserId()
    const now = new Date().toISOString()
    
    const user: UserProfile = {
      id: userId,
      name,
      onboardingCompleted: true,
      onboardingData,
      preferences: {
        theme: 'system',
        notifications: true,
        units: 'metric',
        language: 'en'
      },
      createdAt: now,
      lastActive: now
    }

    this.saveUser(user)
    return user
  }

  static saveUser(user: UserProfile): void {
    if (typeof window === 'undefined') return
    
    user.lastActive = new Date().toISOString()
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user))
  }

  static updateOnboardingData(onboardingData: Partial<OnboardingData>): void {
    const user = this.getUser()
    if (!user) return

    user.onboardingData = { ...user.onboardingData, ...onboardingData }
    user.onboardingCompleted = this.isOnboardingComplete(user.onboardingData)
    this.saveUser(user)
  }

  static isOnboardingComplete(data: OnboardingData): boolean {
    return !!(
      data.goal &&
      data.height &&
      data.weight &&
      data.age &&
      data.experience &&
      data.equipment.length > 0 &&
      data.daysPerWeek
    )
  }

  static clearUserData(): void {
    if (typeof window === 'undefined') return
    
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  }
}

// AI Workout Generation Logic
export class WorkoutGenerator {
  static generatePersonalizedWorkout(user: UserProfile): WorkoutPlan {
    const { goal, experience, equipment, daysPerWeek } = user.onboardingData
    
    // Base workout template based on goal
    const workoutTemplates = {
      'weight-loss': {
        name: 'Fat Burning Circuit',
        focus: 'cardio',
        duration: 35,
        exercises: this.getCardioExercises(equipment, experience)
      },
      'muscle-gain': {
        name: 'Strength Builder',
        focus: 'strength',
        duration: 50,
        exercises: this.getStrengthExercises(equipment, experience)
      },
      'endurance': {
        name: 'Endurance Booster',
        focus: 'endurance',
        duration: 40,
        exercises: this.getEnduranceExercises(equipment, experience)
      },
      'maintenance': {
        name: 'Balanced Workout',
        focus: 'general',
        duration: 35,
        exercises: this.getBalancedExercises(equipment, experience)
      }
    }

    const template = workoutTemplates[goal] || workoutTemplates['maintenance']
    
    return {
      id: `workout_${Date.now()}`,
      name: template.name,
      description: `Personalized ${template.focus} workout for ${experience} level`,
      duration: template.duration,
      exercises: template.exercises,
      difficulty: experience as any,
      tags: [template.focus, experience, ...equipment],
      createdAt: new Date().toISOString()
    }
  }

  private static getCardioExercises(equipment: string[], level: string): Exercise[] {
    const baseExercises = [
      {
        id: 'jumping_jacks',
        name: 'Jumping Jacks',
        description: 'Full body cardio exercise',
        sets: 3,
        reps: '30 seconds',
        restTime: 30,
        equipment: [],
        muscleGroups: ['full-body'],
        instructions: ['Stand upright', 'Jump while spreading legs', 'Raise arms overhead', 'Return to start position']
      },
      {
        id: 'high_knees',
        name: 'High Knees',
        description: 'Cardio exercise targeting legs and core',
        sets: 3,
        reps: '30 seconds',
        restTime: 30,
        equipment: [],
        muscleGroups: ['legs', 'core'],
        instructions: ['Stand in place', 'Lift knees to hip height', 'Alternate legs quickly', 'Keep core engaged']
      }
    ]

    // Add equipment-specific exercises
    if (equipment.includes('gym') || equipment.includes('home-basic')) {
      baseExercises.push({
        id: 'burpees',
        name: 'Burpees',
        description: 'High-intensity full body exercise',
        sets: 3,
        reps: level === 'beginner' ? '5-8' : level === 'intermediate' ? '8-12' : '12-15',
        restTime: 45,
        equipment: [],
        muscleGroups: ['full-body'],
        instructions: ['Start standing', 'Drop to squat position', 'Jump back to plank', 'Do push-up', 'Jump forward', 'Jump up with arms overhead']
      })
    }

    return baseExercises
  }

  private static getStrengthExercises(equipment: string[], level: string): Exercise[] {
    const bodyweightExercises = [
      {
        id: 'push_ups',
        name: 'Push-ups',
        description: 'Upper body strength exercise',
        sets: 3,
        reps: level === 'beginner' ? '5-10' : level === 'intermediate' ? '10-15' : '15-20',
        restTime: 60,
        equipment: [],
        muscleGroups: ['chest', 'shoulders', 'triceps'],
        instructions: ['Start in plank position', 'Lower chest to ground', 'Push back up', 'Keep core tight']
      },
      {
        id: 'squats',
        name: 'Bodyweight Squats',
        description: 'Lower body strength exercise',
        sets: 3,
        reps: level === 'beginner' ? '10-15' : level === 'intermediate' ? '15-20' : '20-25',
        restTime: 60,
        equipment: [],
        muscleGroups: ['legs', 'glutes'],
        instructions: ['Stand with feet shoulder-width apart', 'Lower hips back and down', 'Keep knees aligned with toes', 'Return to standing']
      }
    ]

    // Add equipment-specific exercises
    if (equipment.includes('gym')) {
      bodyweightExercises.push({
        id: 'deadlifts',
        name: 'Deadlifts',
        description: 'Compound strength exercise',
        sets: 3,
        reps: level === 'beginner' ? '5-8' : level === 'intermediate' ? '6-10' : '8-12',
        restTime: 90,
        equipment: ['barbell'],
        muscleGroups: ['back', 'legs', 'glutes'],
        instructions: ['Stand with feet hip-width apart', 'Grip barbell with both hands', 'Keep back straight', 'Lift by extending hips and knees', 'Lower with control']
      })
    }

    return bodyweightExercises
  }

  private static getEnduranceExercises(equipment: string[], level: string): Exercise[] {
    return [
      {
        id: 'mountain_climbers',
        name: 'Mountain Climbers',
        description: 'Cardio endurance exercise',
        sets: 3,
        reps: '45 seconds',
        restTime: 15,
        equipment: [],
        muscleGroups: ['core', 'legs', 'shoulders'],
        instructions: ['Start in plank position', 'Alternate bringing knees to chest', 'Keep hips level', 'Maintain fast pace']
      },
      {
        id: 'plank_hold',
        name: 'Plank Hold',
        description: 'Core endurance exercise',
        sets: 3,
        reps: level === 'beginner' ? '20-30 seconds' : level === 'intermediate' ? '30-45 seconds' : '45-60 seconds',
        restTime: 30,
        equipment: [],
        muscleGroups: ['core'],
        instructions: ['Start in plank position', 'Keep body straight', 'Hold position', 'Breathe normally']
      }
    ]
  }

  private static getBalancedExercises(equipment: string[], level: string): Exercise[] {
    return [
      ...this.getStrengthExercises(equipment, level).slice(0, 2),
      ...this.getCardioExercises(equipment, level).slice(0, 2)
    ]
  }
}

// Nutrition Plan Generation
export class NutritionGenerator {
  static generatePersonalizedNutrition(user: UserProfile): NutritionPlan {
    const { goal, weight, height, age } = user.onboardingData
    const weightNum = parseFloat(weight) || 70
    const heightNum = parseFloat(height) || 170
    const ageNum = parseFloat(age) || 25

    // Calculate BMR (Basal Metabolic Rate)
    const bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum)
    
    // Adjust calories based on goal
    let dailyCalories = bmr * 1.4 // light activity multiplier
    
    switch (goal) {
      case 'weight-loss':
        dailyCalories = Math.round(dailyCalories * 0.85) // 15% deficit
        break
      case 'muscle-gain':
        dailyCalories = Math.round(dailyCalories * 1.15) // 15% surplus
        break
      case 'endurance':
        dailyCalories = Math.round(dailyCalories * 1.2) // Higher for cardio
        break
      default:
        dailyCalories = Math.round(dailyCalories) // maintenance
    }

    // Calculate macros based on goal
    let proteinRatio = 0.3, carbRatio = 0.4, fatRatio = 0.3

    if (goal === 'muscle-gain') {
      proteinRatio = 0.35
      carbRatio = 0.4
      fatRatio = 0.25
    } else if (goal === 'weight-loss') {
      proteinRatio = 0.4
      carbRatio = 0.3
      fatRatio = 0.3
    }

    const macros = {
      protein: Math.round((dailyCalories * proteinRatio) / 4), // 4 calories per gram
      carbs: Math.round((dailyCalories * carbRatio) / 4),
      fats: Math.round((dailyCalories * fatRatio) / 9) // 9 calories per gram
    }

    return {
      id: `nutrition_${Date.now()}`,
      name: `${goal.charAt(0).toUpperCase() + goal.slice(1).replace('-', ' ')} Plan`,
      dailyCalories,
      macros,
      meals: this.generateMeals(dailyCalories, macros, goal),
      createdAt: new Date().toISOString()
    }
  }

  private static generateMeals(calories: number, macros: any, goal: string): Meal[] {
    // Sample meal distribution
    const meals: Meal[] = [
      {
        id: 'breakfast',
        type: 'breakfast',
        name: 'Protein Oatmeal Bowl',
        calories: Math.round(calories * 0.25),
        macros: {
          protein: Math.round(macros.protein * 0.25),
          carbs: Math.round(macros.carbs * 0.35),
          fats: Math.round(macros.fats * 0.2)
        },
        ingredients: ['Oats', 'Protein powder', 'Berries', 'Almonds']
      },
      {
        id: 'lunch',
        type: 'lunch',
        name: 'Grilled Chicken Salad',
        calories: Math.round(calories * 0.35),
        macros: {
          protein: Math.round(macros.protein * 0.4),
          carbs: Math.round(macros.carbs * 0.3),
          fats: Math.round(macros.fats * 0.4)
        },
        ingredients: ['Chicken breast', 'Mixed greens', 'Avocado', 'Olive oil']
      },
      {
        id: 'dinner',
        type: 'dinner',
        name: 'Salmon & Quinoa',
        calories: Math.round(calories * 0.4),
        macros: {
          protein: Math.round(macros.protein * 0.35),
          carbs: Math.round(macros.carbs * 0.35),
          fats: Math.round(macros.fats * 0.4)
        },
        ingredients: ['Salmon fillet', 'Quinoa', 'Broccoli', 'Lemon']
      }
    ]

    return meals
  }
}

// Nutrition Tracking System
export class NutritionTracker {
  static getTodaysLog(): DailyNutritionLog {
    const today = new Date().toISOString().split('T')[0]
    return this.getLogForDate(today)
  }

  static getLogForDate(date: string): DailyNutritionLog {
    if (typeof window === 'undefined') {
      return this.createEmptyLog(date)
    }

    const logs = this.getAllLogs()
    return logs[date] || this.createEmptyLog(date)
  }

  static getAllLogs(): { [date: string]: DailyNutritionLog } {
    if (typeof window === 'undefined') return {}
    
    const stored = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS)
    if (!stored) return {}
    
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('Failed to parse daily logs:', error)
      return {}
    }
  }

  static saveLog(log: DailyNutritionLog): void {
    if (typeof window === 'undefined') return
    
    const logs = this.getAllLogs()
    logs[log.date] = log
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs))
  }

  static logFood(foodId: string, servingSize: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'): void {
    const food = FoodDatabase.getFoodById(foodId)
    if (!food) return

    const multiplier = servingSize / 100 // since nutrition is per 100g
    const loggedFood: LoggedFood = {
      id: `logged_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      foodId,
      foodName: food.name,
      servingSize,
      mealType,
      loggedAt: new Date().toISOString(),
      calories: Math.round(food.calories * multiplier),
      macros: {
        protein: Math.round(food.macros.protein * multiplier),
        carbs: Math.round(food.macros.carbs * multiplier),
        fats: Math.round(food.macros.fats * multiplier)
      }
    }

    const today = new Date().toISOString().split('T')[0]
    const log = this.getLogForDate(today)
    log.foods.push(loggedFood)
    this.updateLogTotals(log)
    this.saveLog(log)
  }

  static updateWaterIntake(date: string, amount: number): void {
    const log = this.getLogForDate(date)
    log.waterIntake += amount
    this.saveLog(log)
  }

  static removeFood(foodLogId: string, date: string): void {
    const log = this.getLogForDate(date)
    log.foods = log.foods.filter(f => f.id !== foodLogId)
    this.updateLogTotals(log)
    this.saveLog(log)
  }

  private static createEmptyLog(date: string): DailyNutritionLog {
    return {
      date,
      foods: [],
      totalCalories: 0,
      totalMacros: { protein: 0, carbs: 0, fats: 0 },
      waterIntake: 0
    }
  }

  private static updateLogTotals(log: DailyNutritionLog): void {
    log.totalCalories = log.foods.reduce((sum, food) => sum + food.calories, 0)
    log.totalMacros = {
      protein: log.foods.reduce((sum, food) => sum + food.macros.protein, 0),
      carbs: log.foods.reduce((sum, food) => sum + food.macros.carbs, 0),
      fats: log.foods.reduce((sum, food) => sum + food.macros.fats, 0)
    }
  }
}

// Food Database
export class FoodDatabase {
  private static foods: FoodItem[] = [
    {
      id: 'chicken_breast',
      name: 'Chicken Breast',
      category: 'protein',
      calories: 165,
      macros: { protein: 31, carbs: 0, fats: 3.6 },
      commonServings: [
        { name: '1 small breast (85g)', grams: 85 },
        { name: '1 medium breast (120g)', grams: 120 },
        { name: '1 large breast (150g)', grams: 150 }
      ]
    },
    {
      id: 'brown_rice',
      name: 'Brown Rice (cooked)',
      category: 'carbs',
      calories: 112,
      macros: { protein: 2.6, carbs: 23, fats: 0.9 },
      commonServings: [
        { name: '1/2 cup (90g)', grams: 90 },
        { name: '1 cup (180g)', grams: 180 }
      ]
    },
    {
      id: 'avocado',
      name: 'Avocado',
      category: 'fats',
      calories: 160,
      macros: { protein: 2, carbs: 9, fats: 15 },
      commonServings: [
        { name: '1/4 avocado (50g)', grams: 50 },
        { name: '1/2 avocado (100g)', grams: 100 },
        { name: '1 whole avocado (200g)', grams: 200 }
      ]
    },
    {
      id: 'oats',
      name: 'Oats (raw)',
      category: 'carbs',
      calories: 389,
      macros: { protein: 16.9, carbs: 66, fats: 6.9 },
      commonServings: [
        { name: '1/2 cup (40g)', grams: 40 },
        { name: '3/4 cup (60g)', grams: 60 }
      ]
    },
    {
      id: 'salmon',
      name: 'Salmon',
      category: 'protein',
      calories: 208,
      macros: { protein: 20, carbs: 0, fats: 12 },
      commonServings: [
        { name: '1 fillet (150g)', grams: 150 },
        { name: '1 serving (100g)', grams: 100 }
      ]
    },
    {
      id: 'broccoli',
      name: 'Broccoli',
      category: 'vegetables',
      calories: 34,
      macros: { protein: 2.8, carbs: 7, fats: 0.4 },
      commonServings: [
        { name: '1 cup chopped (90g)', grams: 90 },
        { name: '1 medium head (150g)', grams: 150 }
      ]
    },
    {
      id: 'banana',
      name: 'Banana',
      category: 'fruits',
      calories: 89,
      macros: { protein: 1.1, carbs: 23, fats: 0.3 },
      commonServings: [
        { name: '1 small (100g)', grams: 100 },
        { name: '1 medium (120g)', grams: 120 },
        { name: '1 large (140g)', grams: 140 }
      ]
    },
    {
      id: 'greek_yogurt',
      name: 'Greek Yogurt (plain)',
      category: 'dairy',
      calories: 59,
      macros: { protein: 10, carbs: 3.6, fats: 0.4 },
      commonServings: [
        { name: '1/2 cup (125g)', grams: 125 },
        { name: '1 cup (250g)', grams: 250 }
      ]
    },
    {
      id: 'almonds',
      name: 'Almonds',
      category: 'fats',
      calories: 579,
      macros: { protein: 21, carbs: 22, fats: 50 },
      commonServings: [
        { name: '1 handful (28g)', grams: 28 },
        { name: '1/4 cup (35g)', grams: 35 }
      ]
    },
    {
      id: 'eggs',
      name: 'Eggs (whole)',
      category: 'protein',
      calories: 155,
      macros: { protein: 13, carbs: 1.1, fats: 11 },
      commonServings: [
        { name: '1 large egg (50g)', grams: 50 },
        { name: '2 large eggs (100g)', grams: 100 }
      ]
    }
  ]

  static getAllFoods(): FoodItem[] {
    return this.foods
  }

  static getFoodById(id: string): FoodItem | undefined {
    return this.foods.find(food => food.id === id)
  }

  static searchFoods(query: string): FoodItem[] {
    const lowercaseQuery = query.toLowerCase()
    return this.foods.filter(food => 
      food.name.toLowerCase().includes(lowercaseQuery) ||
      food.category.toLowerCase().includes(lowercaseQuery)
    )
  }

  static getFoodsByCategory(category: FoodItem['category']): FoodItem[] {
    return this.foods.filter(food => food.category === category)
  }
}

// Progress Tracking
export class ProgressTracker {
  static addWeightEntry(weight: number, notes?: string): void {
    if (typeof window === 'undefined') return
    
    const entry: WeightEntry = {
      id: `weight_${Date.now()}`,
      date: new Date().toISOString(),
      weight,
      notes
    }
    
    const history = this.getWeightHistory()
    history.push(entry)
    localStorage.setItem(STORAGE_KEYS.WEIGHT_HISTORY, JSON.stringify(history))
  }

  static getWeightHistory(): WeightEntry[] {
    if (typeof window === 'undefined') return []
    
    const stored = localStorage.getItem(STORAGE_KEYS.WEIGHT_HISTORY)
    if (!stored) return []
    
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('Failed to parse weight history:', error)
      return []
    }
  }

  static getAchievements(): Achievement[] {
    if (typeof window === 'undefined') return []
    
    const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)
    if (!stored) {
      // Initialize default achievements
      const defaultAchievements = this.createDefaultAchievements()
      this.saveAchievements(defaultAchievements)
      return defaultAchievements
    }
    
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('Failed to parse achievements:', error)
      return []
    }
  }

  static saveAchievements(achievements: Achievement[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements))
  }

  static updateAchievementProgress(achievementId: string, progress: number): void {
    const achievements = this.getAchievements()
    const achievement = achievements.find(a => a.id === achievementId)
    
    if (achievement) {
      achievement.progress = Math.min(progress, achievement.target)
      if (achievement.progress >= achievement.target && !achievement.unlockedAt) {
        achievement.unlockedAt = new Date().toISOString()
      }
      this.saveAchievements(achievements)
    }
  }

  private static createDefaultAchievements(): Achievement[] {
    return [
      {
        id: 'first_workout',
        title: 'First Steps',
        description: 'Complete your first workout',
        icon: 'Dumbbell',
        category: 'workout',
        progress: 0,
        target: 1
      },
      {
        id: 'week_warrior',
        title: 'Week Warrior',
        description: 'Complete 7 workouts',
        icon: 'Trophy',
        category: 'workout',
        progress: 0,
        target: 7
      },
      {
        id: 'nutrition_ninja',
        title: 'Nutrition Ninja',
        description: 'Log meals for 7 consecutive days',
        icon: 'Apple',
        category: 'nutrition',
        progress: 0,
        target: 7
      },
      {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain a 30-day streak',
        icon: 'Flame',
        category: 'streak',
        progress: 0,
        target: 30
      }
    ]
  }
}
