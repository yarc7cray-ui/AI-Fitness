import { WorkoutHeader } from "@/components/workouts/workout-header"
import { WorkoutTemplates } from "@/components/workouts/workout-templates"
import { AIWorkoutSuggestions } from "@/components/workouts/ai-workout-suggestions"

export default function WorkoutsPage() {
  return (
    <div className="min-h-screen bg-background">
      <WorkoutHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <AIWorkoutSuggestions />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <WorkoutTemplates />
          </div>
        </div>
      </main>
    </div>
  )
}
