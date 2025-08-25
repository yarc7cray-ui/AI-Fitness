"use client"

import { ProgressHeader } from "@/components/progress/progress-header"
import { EnhancedProgressCharts } from "@/components/progress/enhanced-progress-charts"
import { AchievementSystem } from "@/components/progress/achievement-system"
import { WeightTracker } from "@/components/progress/weight-tracker"

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProgressHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Enhanced Progress Charts with integrated overview */}
        <EnhancedProgressCharts />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Additional Components */}
          <WeightTracker />
          <AchievementSystem />
        </div>
      </main>
    </div>
  )
}
