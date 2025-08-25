import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Target } from "lucide-react"

const workoutHistory = [
  {
    date: "2024-01-15",
    name: "Upper Body Strength",
    duration: "45 min",
    exercises: 6,
    totalSets: 18,
    totalReps: 180,
    status: "completed",
  },
  {
    date: "2024-01-13",
    name: "HIIT Cardio",
    duration: "20 min",
    exercises: 4,
    totalSets: 12,
    totalReps: 240,
    status: "completed",
  },
  {
    date: "2024-01-11",
    name: "Lower Body Power",
    duration: "50 min",
    exercises: 5,
    totalSets: 15,
    totalReps: 150,
    status: "completed",
  },
  {
    date: "2024-01-09",
    name: "Core & Stability",
    duration: "30 min",
    exercises: 6,
    totalSets: 18,
    totalReps: 300,
    status: "completed",
  },
]

export function WorkoutHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-xl flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Workouts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {workoutHistory.map((workout, index) => (
          <div key={index} className="p-4 rounded-lg border hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-sans font-semibold text-foreground">{workout.name}</h3>
                <p className="font-serif text-sm text-muted-foreground">
                  {new Date(workout.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {workout.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="font-sans text-sm font-medium">{workout.duration}</div>
                <div className="font-serif text-xs text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="font-sans text-sm font-medium">{workout.exercises}</div>
                <div className="font-serif text-xs text-muted-foreground">Exercises</div>
              </div>
              <div className="text-center">
                <div className="font-sans text-sm font-medium">{workout.totalSets}</div>
                <div className="font-serif text-xs text-muted-foreground">Sets</div>
              </div>
              <div className="text-center">
                <div className="font-sans text-sm font-medium">{workout.totalReps}</div>
                <div className="font-serif text-xs text-muted-foreground">Reps</div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Details
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
