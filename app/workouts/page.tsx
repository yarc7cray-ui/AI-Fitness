import { WorkoutHeader } from "@/components/workouts/workout-header"
import { WorkoutFilters } from "@/components/workouts/workout-filters"
import { ExerciseGrid } from "@/components/workouts/exercise-grid"
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
            <WorkoutFilters />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ExerciseGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
