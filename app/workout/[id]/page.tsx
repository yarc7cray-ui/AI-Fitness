import { WorkoutExecution } from "@/components/workout-execution"

interface WorkoutPageProps {
  params: {
    id: string
  }
}

export default function WorkoutPage({ params }: WorkoutPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <WorkoutExecution workoutId={params.id} />
    </div>
  )
}
