import { NutritionHeader } from "@/components/nutrition/nutrition-header"
import { DailyNutritionStats } from "@/components/nutrition/daily-nutrition-stats"
import { MealPlanning } from "@/components/nutrition/meal-planning"
import { QuickLogMeal } from "@/components/nutrition/quick-log-meal"
import { WaterTracking } from "@/components/nutrition/water-tracking"
import { NutritionAnalytics } from "@/components/nutrition/nutrition-analytics"

export default function NutritionPage() {
  return (
    <div className="min-h-screen bg-background">
      <NutritionHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <DailyNutritionStats />

        <div className="grid gap-6 md:grid-cols-2">
          <QuickLogMeal />
          <WaterTracking />
        </div>

        <MealPlanning />

        <NutritionAnalytics />
      </main>
    </div>
  )
}
