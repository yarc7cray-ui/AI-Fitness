"use client"

import { ProgressHeader } from "@/components/progress/progress-header"
import { ProgressOverview } from "@/components/progress/progress-overview"
import { ProgressCharts } from "@/components/progress/progress-charts"
import { AchievementSystem } from "@/components/progress/achievement-system"
import { WeightTracker } from "@/components/progress/weight-tracker"
import { WorkoutHistory } from "@/components/progress/workout-history"

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProgressHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <ProgressOverview />
        
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressCharts />
            <WorkoutHistory />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <WeightTracker />
            <AchievementSystem />
          </div>
        </div>
      </main>
    </div>
  )
}
