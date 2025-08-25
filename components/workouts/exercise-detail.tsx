import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, BookOpen, Target, Clock, Dumbbell } from "lucide-react"
import Link from "next/link"

interface ExerciseDetailProps {
  exerciseId: string
}

// Mock data - in real app this would come from API/database
const exerciseData = {
  "push-ups": {
    name: "Push-ups",
    bodyPart: "Chest",
    difficulty: "Beginner",
    duration: "10 min",
    equipment: "Bodyweight",
    image: "/exercise-push-ups-demonstration.png",
    videoUrl: "/placeholder-video.mp4",
    description:
      "Push-ups are a classic upper body exercise that targets the chest, shoulders, and triceps. This bodyweight movement is perfect for building strength and can be modified for all fitness levels.",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart",
      "Keep your body in a straight line from head to heels",
      "Lower your chest toward the ground by bending your elbows",
      "Push back up to the starting position",
      "Repeat for desired number of repetitions",
    ],
    tips: [
      "Keep your core engaged throughout the movement",
      "Don't let your hips sag or pike up",
      "Control the descent - don't drop down quickly",
      "Breathe in on the way down, out on the way up",
    ],
    muscles: ["Chest", "Shoulders", "Triceps", "Core"],
    variations: [
      "Knee Push-ups (easier)",
      "Incline Push-ups (easier)",
      "Diamond Push-ups (harder)",
      "Decline Push-ups (harder)",
    ],
  },
}

export function ExerciseDetail({ exerciseId }: ExerciseDetailProps) {
  const exercise = exerciseData[exerciseId as keyof typeof exerciseData] || exerciseData["push-ups"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/workouts">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Button>
        </Link>
      </div>

      {/* Video/Image */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={exercise.image || "/placeholder.svg"}
              alt={exercise.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-t-lg">
              <Button size="lg" className="gradient-primary text-white hover:opacity-90">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-sans text-3xl font-bold text-foreground">{exercise.name}</h1>
                <p className="font-serif text-muted-foreground mt-2">{exercise.description}</p>
              </div>
              <Badge
                variant={
                  exercise.difficulty === "Beginner"
                    ? "secondary"
                    : exercise.difficulty === "Intermediate"
                      ? "default"
                      : "destructive"
                }
              >
                {exercise.difficulty}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <Target className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="font-sans text-sm font-medium">{exercise.bodyPart}</div>
                <div className="font-serif text-xs text-muted-foreground">Primary</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <Clock className="h-5 w-5 mx-auto mb-2 text-secondary" />
                <div className="font-sans text-sm font-medium">{exercise.duration}</div>
                <div className="font-serif text-xs text-muted-foreground">Duration</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <Dumbbell className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="font-sans text-sm font-medium">{exercise.equipment}</div>
                <div className="font-serif text-xs text-muted-foreground">Equipment</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <BookOpen className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <div className="font-sans text-sm font-medium">{exercise.instructions.length}</div>
                <div className="font-serif text-xs text-muted-foreground">Steps</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-xl">How to Perform</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {exercise.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-sans font-medium">
                  {index + 1}
                </div>
                <p className="font-serif text-sm leading-relaxed">{instruction}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Tips & Muscles */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-sans text-lg">Pro Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {exercise.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="font-serif text-sm">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-sans text-lg">Muscles Worked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {exercise.muscles.map((muscle, index) => (
                <Badge key={index} variant="outline" className="font-serif">
                  {muscle}
                </Badge>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="font-sans font-medium mb-2">Variations</h4>
              <ul className="space-y-1">
                {exercise.variations.map((variation, index) => (
                  <li key={index} className="font-serif text-sm text-muted-foreground">
                    • {variation}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
