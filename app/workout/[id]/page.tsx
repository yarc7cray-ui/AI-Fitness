import { EnhancedWorkoutExecution } from "@/components/enhanced-workout-execution"

interface WorkoutPageProps {
  params: {
    id: string
  }
}

export default function WorkoutPage({ params }: WorkoutPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedWorkoutExecution templateId={params.id} />
    </div>
  )
}
