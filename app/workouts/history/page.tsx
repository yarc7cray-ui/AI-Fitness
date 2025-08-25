import { WorkoutHistory } from "@/components/workouts/workout-history"
import { PersonalRecords } from "@/components/workouts/personal-records"

export default function WorkoutHistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold text-foreground">Workout History</h1>
          <p className="mt-2 font-serif text-muted-foreground">Track your progress and view your personal records</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WorkoutHistory />
          </div>
          <div className="lg:col-span-1">
            <PersonalRecords />
          </div>
        </div>
      </main>
    </div>
  )
}
