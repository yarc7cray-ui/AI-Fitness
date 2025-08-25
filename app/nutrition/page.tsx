"use client"

import { NutritionHeader } from "@/components/nutrition/nutrition-header"
import { DailyNutritionStats } from "@/components/nutrition/daily-nutrition-stats"
import { MealLogger } from "@/components/nutrition/meal-logger"
import { MealPlanning } from "@/components/nutrition/meal-planning"
import { NutritionAnalytics } from "@/components/nutrition/nutrition-analytics"
import { useState } from "react"

export default function NutritionPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleFoodAdded = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      <NutritionHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <DailyNutritionStats key={refreshKey} />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Meal Logging */}
          <div className="lg:col-span-2">
            <MealLogger onFoodAdded={handleFoodAdded} />
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
