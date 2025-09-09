"use client"

import { NutritionHeader } from "@/components/nutrition/nutrition-header"
import { EnhancedMealLogger } from "@/components/nutrition/enhanced-meal-logger"
import { MealPlanning } from "@/components/nutrition/meal-planning"
import { NutritionAnalytics } from "@/components/nutrition/nutrition-analytics"

export default function NutritionPage() {
  return (
    <div className="min-h-screen bg-background">
      <NutritionHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Enhanced Meal Logging with integrated daily stats */}
        <EnhancedMealLogger />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Meal Planning */}
          <div className="lg:col-span-2">
            <MealPlanning />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MealPlanning />
            <NutritionAnalytics key={refreshKey} />
          </div>
        </div>
      </main>
    </div>
  )
}
