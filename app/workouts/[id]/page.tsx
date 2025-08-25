import { ExerciseDetail } from "@/components/workouts/exercise-detail"
import { WorkoutTracker } from "@/components/workouts/workout-tracker"

interface ExercisePageProps {
  params: {
    id: string
  }
}

export default function ExercisePage({ params }: ExercisePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ExerciseDetail exerciseId={params.id} />
          </div>
          <div className="lg:col-span-1">
            <WorkoutTracker exerciseId={params.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
