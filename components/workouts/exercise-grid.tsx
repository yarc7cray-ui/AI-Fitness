import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Target, Play } from "lucide-react"
import Link from "next/link"

const exercises = [
  {
    id: "push-ups",
    name: "Push-ups",
    bodyPart: "Chest",
    difficulty: "Beginner",
    duration: "10 min",
    equipment: "Bodyweight",
    image: "/exercise-push-ups-demonstration.png",
    description: "Classic upper body exercise targeting chest, shoulders, and triceps",
  },
  {
    id: "squats",
    name: "Squats",
    bodyPart: "Legs",
    difficulty: "Beginner",
    duration: "15 min",
    equipment: "Bodyweight",
    image: "/exercise-squats-demonstration.png",
    description: "Fundamental lower body movement for strength and mobility",
  },
  {
    id: "deadlifts",
    name: "Deadlifts",
    bodyPart: "Back",
    difficulty: "Intermediate",
    duration: "20 min",
    equipment: "Barbell",
    image: "/exercise-deadlifts-demonstration.png",
    description: "Compound movement for posterior chain development",
  },
  {
    id: "pull-ups",
    name: "Pull-ups",
    bodyPart: "Back",
    difficulty: "Intermediate",
    duration: "12 min",
    equipment: "Pull-up Bar",
    image: "/exercise-pull-ups-demonstration.png",
    description: "Upper body pulling exercise for back and biceps",
  },
  {
    id: "planks",
    name: "Planks",
    bodyPart: "Core",
    difficulty: "Beginner",
    duration: "8 min",
    equipment: "Bodyweight",
    image: "/exercise-planks-demonstration.png",
    description: "Isometric core strengthening exercise",
  },
  {
    id: "burpees",
    name: "Burpees",
    bodyPart: "Cardio",
    difficulty: "Advanced",
    duration: "15 min",
    equipment: "Bodyweight",
    image: "/exercise-burpees-demonstration.png",
    description: "Full-body cardio and strength exercise",
  },
]

export function ExerciseGrid() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-foreground">All Exercises</h2>
          <p className="font-serif text-muted-foreground">Choose from our comprehensive exercise library</p>
        </div>
        <Badge variant="outline" className="font-sans">
          {exercises.length} exercises
        </Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={exercise.image || "/placeholder.svg"}
                alt={exercise.name}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <Badge
                  variant={
                    exercise.difficulty === "Beginner"
                      ? "secondary"
                      : exercise.difficulty === "Intermediate"
                        ? "default"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {exercise.difficulty}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                <h3 className="font-sans font-semibold text-lg text-foreground">{exercise.name}</h3>
                <p className="font-serif text-sm text-muted-foreground line-clamp-2">{exercise.description}</p>
              </div>

              <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  <span className="font-serif">{exercise.bodyPart}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span className="font-serif">{exercise.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/workouts/${exercise.id}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Details
                  </Button>
                </Link>
                <Button size="sm" className="gradient-primary text-white hover:opacity-90">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
