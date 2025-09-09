import { NutritionDatabase, type Food, type MealEntry, type DailyNutrition, type NutritionGoals, type MealType, type Recipe } from './nutrition-database'

export interface WaterEntry {
  id: string
  amount: number // ml
  timestamp: Date
}

export interface NutritionProgress {
  date: Date
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  water: number
  goalMetPercentage: number
}

export interface FoodLog {
  id: string
  userId: string
  date: Date
  meals: {
    breakfast: MealEntry[]
    lunch: MealEntry[]
    dinner: MealEntry[]
    snacks: MealEntry[]
  }
  waterEntries: WaterEntry[]
  notes?: string
  weight?: number // daily weight log
}

// Nutrition Tracking Service
export class NutritionTracker {
  private readonly STORAGE_KEYS = {
    NUTRITION_GOALS: 'nutrition_goals',
    FOOD_LOGS: 'food_logs',
    NUTRITION_PROGRESS: 'nutrition_progress',
    FAVORITES: 'favorite_foods',
    RECENT_FOODS: 'recent_foods'
  }

  // Goals management
  getNutritionGoals(): NutritionGoals {
    if (typeof window === 'undefined') {
      return this.getDefaultGoals()
    }
    
    const stored = localStorage.getItem(this.STORAGE_KEYS.NUTRITION_GOALS)
    if (!stored) {
      return this.getDefaultGoals()
    }
    
    try {
      return JSON.parse(stored)
    } catch {
      return this.getDefaultGoals()
    }
  }

  private getDefaultGoals(): NutritionGoals {
    return {
      calories: 2000,
      protein: 125,
      carbs: 225,
      fat: 67,
      fiber: 28,
      water: 2500
    }
  }

  setNutritionGoals(goals: NutritionGoals): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEYS.NUTRITION_GOALS, JSON.stringify(goals))
  }

  generatePersonalizedGoals(
    age: number,
    gender: 'male' | 'female',
    weight: number,
    height: number,
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active',
    goal: 'weight-loss' | 'maintenance' | 'muscle-gain'
  ): NutritionGoals {
    const goals = NutritionDatabase.generateNutritionGoals(age, gender, weight, height, activityLevel, goal)
    this.setNutritionGoals(goals)
    return goals
  }

  // Daily food logging
  getTodaysFoodLog(): FoodLog {
    const today = new Date().toISOString().split('T')[0]
    const logs = this.getFoodLogs()
    
    let todaysLog = logs.find(log => 
      log.date.toISOString().split('T')[0] === today
    )

    if (!todaysLog) {
      todaysLog = this.createNewFoodLog(new Date())
    }

    return todaysLog
  }

  getFoodLogByDate(date: Date): FoodLog {
    const dateString = date.toISOString().split('T')[0]
    const logs = this.getFoodLogs()
    
    let log = logs.find(l => 
      l.date.toISOString().split('T')[0] === dateString
    )

    if (!log) {
      log = this.createNewFoodLog(date)
    }

    return log
  }

  private createNewFoodLog(date: Date): FoodLog {
    const newLog: FoodLog = {
      id: `food_log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: 'current_user', // In real app, get from auth
      date,
      meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      },
      waterEntries: []
    }

    const logs = this.getFoodLogs()
    logs.push(newLog)
    this.saveFoodLogs(logs)
    
    return newLog
  }

  // Meal entry management
  addFoodToMeal(
    foodId: string, 
    quantity: number, 
    mealType: MealType, 
    date?: Date,
    notes?: string
  ): MealEntry | null {
    const food = NutritionDatabase.getFoodById(foodId)
    if (!food) return null

    const targetDate = date || new Date()
    const foodLog = this.getFoodLogByDate(targetDate)

    const mealEntry: MealEntry = {
      id: `meal_entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      foodId,
      food,
      quantity,
      mealType,
      loggedAt: new Date(),
      notes
    }

    foodLog.meals[mealType].push(mealEntry)
    this.updateFoodLog(foodLog)
    
    // Add to recent foods
    this.addToRecentFoods(food)
    
    return mealEntry
  }

  addRecipeToMeal(
    recipeId: string,
    servings: number,
    mealType: MealType,
    date?: Date
  ): MealEntry[] {
    const recipe = NutritionDatabase.getRecipeById(recipeId)
    if (!recipe) return []

    const targetDate = date || new Date()
    const mealEntries: MealEntry[] = []

    // Add each ingredient as a meal entry
    recipe.ingredients.forEach(ingredient => {
      const adjustedQuantity = (ingredient.quantity / recipe.servings) * servings
      const entry = this.addFoodToMeal(
        ingredient.foodId,
        adjustedQuantity,
        mealType,
        targetDate,
        `From recipe: ${recipe.name}`
      )
      if (entry) {
        mealEntries.push(entry)
      }
    })

    return mealEntries
  }

  updateMealEntry(entryId: string, updates: Partial<MealEntry>): boolean {
    const todaysLog = this.getTodaysFoodLog()
    let found = false

    // Search through all meal types
    Object.values(todaysLog.meals).forEach(meals => {
      const entryIndex = meals.findIndex(entry => entry.id === entryId)
      if (entryIndex !== -1) {
        meals[entryIndex] = { ...meals[entryIndex], ...updates }
        found = true
      }
    })

    if (found) {
      this.updateFoodLog(todaysLog)
    }

    return found
  }

  removeMealEntry(entryId: string): boolean {
    const todaysLog = this.getTodaysFoodLog()
    let found = false

    // Search through all meal types
    Object.keys(todaysLog.meals).forEach(mealType => {
      const meals = todaysLog.meals[mealType as MealType]
      const originalLength = meals.length
      todaysLog.meals[mealType as MealType] = meals.filter(entry => entry.id !== entryId)
      
      if (todaysLog.meals[mealType as MealType].length < originalLength) {
        found = true
      }
    })

    if (found) {
      this.updateFoodLog(todaysLog)
    }

    return found
  }

  // Water tracking
  addWaterEntry(amount: number, date?: Date): WaterEntry {
    const targetDate = date || new Date()
    const foodLog = this.getFoodLogByDate(targetDate)

    const waterEntry: WaterEntry = {
      id: `water_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      timestamp: new Date()
    }

    foodLog.waterEntries.push(waterEntry)
    this.updateFoodLog(foodLog)

    return waterEntry
  }

  getTodaysWaterIntake(): number {
    const todaysLog = this.getTodaysFoodLog()
    return todaysLog.waterEntries.reduce((total, entry) => total + entry.amount, 0)
  }

  removeWaterEntry(entryId: string): boolean {
    const todaysLog = this.getTodaysFoodLog()
    const originalLength = todaysLog.waterEntries.length
    
    todaysLog.waterEntries = todaysLog.waterEntries.filter(entry => entry.id !== entryId)
    
    if (todaysLog.waterEntries.length < originalLength) {
      this.updateFoodLog(todaysLog)
      return true
    }
    
    return false
  }

  // Daily nutrition calculations
  getTodaysNutrition(): DailyNutrition {
    const todaysLog = this.getTodaysFoodLog()
    const goals = this.getNutritionGoals()
    
    // Combine all meals
    const allMeals = [
      ...todaysLog.meals.breakfast,
      ...todaysLog.meals.lunch,
      ...todaysLog.meals.dinner,
      ...todaysLog.meals.snacks
    ]

    const totals = NutritionDatabase.calculateDailyTotals(allMeals)
    const waterIntake = this.getTodaysWaterIntake()

    return {
      date: todaysLog.date,
      meals: todaysLog.meals,
      totals,
      waterIntake,
      goals
    }
  }

  getNutritionByDate(date: Date): DailyNutrition {
    const foodLog = this.getFoodLogByDate(date)
    const goals = this.getNutritionGoals()
    
    const allMeals = [
      ...foodLog.meals.breakfast,
      ...foodLog.meals.lunch,
      ...foodLog.meals.dinner,
      ...foodLog.meals.snacks
    ]

    const totals = NutritionDatabase.calculateDailyTotals(allMeals)
    const waterIntake = foodLog.waterEntries.reduce((total, entry) => total + entry.amount, 0)

    return {
      date: foodLog.date,
      meals: foodLog.meals,
      totals,
      waterIntake,
      goals
    }
  }

  // Progress tracking
  updateNutritionProgress(): void {
    const todaysNutrition = this.getTodaysNutrition()
    const progressData = this.getNutritionProgress()
    
    const today = new Date().toISOString().split('T')[0]
    
    const goalMetPercentage = (
      (todaysNutrition.totals.calories / todaysNutrition.goals.calories) * 100
    )

    const progress: NutritionProgress = {
      date: new Date(),
      calories: todaysNutrition.totals.calories,
      protein: todaysNutrition.totals.protein,
      carbs: todaysNutrition.totals.carbs,
      fat: todaysNutrition.totals.fat,
      fiber: todaysNutrition.totals.fiber,
      water: todaysNutrition.waterIntake,
      goalMetPercentage
    }

    const existingIndex = progressData.findIndex(p => 
      p.date.toISOString().split('T')[0] === today
    )

    if (existingIndex >= 0) {
      progressData[existingIndex] = progress
    } else {
      progressData.push(progress)
    }

    this.saveNutritionProgress(progressData)
  }

  // Food search and favorites
  addToFavorites(food: Food): void {
    const favorites = this.getFavoriteFoods()
    if (!favorites.find(f => f.id === food.id)) {
      favorites.push(food)
      this.saveFavoriteFoods(favorites)
    }
  }

  removeFromFavorites(foodId: string): void {
    const favorites = this.getFavoriteFoods()
    const filtered = favorites.filter(f => f.id !== foodId)
    this.saveFavoriteFoods(filtered)
  }

  getFavoriteFoods(): Food[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.FAVORITES)
    if (!stored) return []
    
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }

  private saveFavoriteFoods(favorites: Food[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
  }

  private addToRecentFoods(food: Food): void {
    const recent = this.getRecentFoods()
    
    // Remove if already exists
    const filtered = recent.filter(f => f.id !== food.id)
    
    // Add to beginning
    filtered.unshift(food)
    
    // Keep only last 20
    const trimmed = filtered.slice(0, 20)
    
    this.saveRecentFoods(trimmed)
  }

  getRecentFoods(): Food[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.RECENT_FOODS)
    if (!stored) return []
    
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }

  private saveRecentFoods(recent: Food[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEYS.RECENT_FOODS, JSON.stringify(recent))
  }

  // Analytics and insights
  getNutritionStats(days: number = 7): {
    averageCalories: number
    averageProtein: number
    averageCarbs: number
    averageFat: number
    averageWater: number
    goalComplianceRate: number
    topFoods: { food: Food, frequency: number }[]
  } {
    const progressData = this.getNutritionProgress()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const recentProgress = progressData.filter(p => p.date >= cutoffDate)
    
    if (recentProgress.length === 0) {
      return {
        averageCalories: 0,
        averageProtein: 0,
        averageCarbs: 0,
        averageFat: 0,
        averageWater: 0,
        goalComplianceRate: 0,
        topFoods: []
      }
    }

    const averageCalories = recentProgress.reduce((sum, p) => sum + p.calories, 0) / recentProgress.length
    const averageProtein = recentProgress.reduce((sum, p) => sum + p.protein, 0) / recentProgress.length
    const averageCarbs = recentProgress.reduce((sum, p) => sum + p.carbs, 0) / recentProgress.length
    const averageFat = recentProgress.reduce((sum, p) => sum + p.fat, 0) / recentProgress.length
    const averageWater = recentProgress.reduce((sum, p) => sum + p.water, 0) / recentProgress.length
    
    const daysWithGoalsMet = recentProgress.filter(p => p.goalMetPercentage >= 90).length
    const goalComplianceRate = (daysWithGoalsMet / recentProgress.length) * 100

    // Calculate top foods from recent logs
    const foodCounts: { [key: string]: { food: Food, count: number } } = {}
    const recentLogs = this.getFoodLogs().filter(log => 
      log.date >= cutoffDate
    )

    recentLogs.forEach(log => {
      Object.values(log.meals).forEach(meals => {
        meals.forEach(meal => {
          if (foodCounts[meal.foodId]) {
            foodCounts[meal.foodId].count++
          } else {
            foodCounts[meal.foodId] = { food: meal.food, count: 1 }
          }
        })
      })
    })

    const topFoods = Object.values(foodCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => ({ food: item.food, frequency: item.count }))

    return {
      averageCalories: Math.round(averageCalories),
      averageProtein: Math.round(averageProtein),
      averageCarbs: Math.round(averageCarbs),
      averageFat: Math.round(averageFat),
      averageWater: Math.round(averageWater),
      goalComplianceRate: Math.round(goalComplianceRate),
      topFoods
    }
  }

  // Data persistence helpers
  private getFoodLogs(): FoodLog[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.FOOD_LOGS)
    if (!stored) return []
    
    try {
      const logs = JSON.parse(stored)
      return logs.map((log: any) => ({
        ...log,
        date: new Date(log.date),
        waterEntries: log.waterEntries.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        })),
        meals: {
          breakfast: log.meals.breakfast.map((meal: any) => ({
            ...meal,
            loggedAt: new Date(meal.loggedAt)
          })),
          lunch: log.meals.lunch.map((meal: any) => ({
            ...meal,
            loggedAt: new Date(meal.loggedAt)
          })),
          dinner: log.meals.dinner.map((meal: any) => ({
            ...meal,
            loggedAt: new Date(meal.loggedAt)
          })),
          snacks: log.meals.snacks.map((meal: any) => ({
            ...meal,
            loggedAt: new Date(meal.loggedAt)
          }))
        }
      }))
    } catch {
      return []
    }
  }

  private saveFoodLogs(logs: FoodLog[]): void {
    if (typeof window === 'undefined') return
    // Keep only last 90 days
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - 90)
    const trimmedLogs = logs.filter(log => log.date >= cutoffDate)
    
    localStorage.setItem(this.STORAGE_KEYS.FOOD_LOGS, JSON.stringify(trimmedLogs))
  }

  private updateFoodLog(log: FoodLog): void {
    const logs = this.getFoodLogs()
    const index = logs.findIndex(l => l.id === log.id)
    
    if (index >= 0) {
      logs[index] = log
    } else {
      logs.push(log)
    }
    
    this.saveFoodLogs(logs)
    this.updateNutritionProgress()
  }

  private getNutritionProgress(): NutritionProgress[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.NUTRITION_PROGRESS)
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

  private saveNutritionProgress(progress: NutritionProgress[]): void {
    if (typeof window === 'undefined') return
    // Keep only last 90 days
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - 90)
    const trimmedProgress = progress.filter(p => p.date >= cutoffDate)
    
    localStorage.setItem(this.STORAGE_KEYS.NUTRITION_PROGRESS, JSON.stringify(trimmedProgress))
  }
}

// Singleton instance
export const nutritionTracker = new NutritionTracker()
