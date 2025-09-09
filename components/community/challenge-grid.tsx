import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Target, Trophy } from "lucide-react"

const challenges = [
  {
    id: 101,
    name: "30-Day Core Blast",
    description: "Daily core workouts to strengthen your abs and lower back",
    image: "/placeholder.svg?key=core",
    participants: 534,
    duration: "30 days",
    difficulty: "Beginner",
    category: "Strength",
  },
  {
    id: 102,
    name: "5K Runner Starter",
    description: "Build endurance and run your first 5K confidently",
    image: "/placeholder.svg?key=5k",
    participants: 781,
    duration: "6 weeks",
    difficulty: "Beginner",
    category: "Cardio",
  },
  {
    id: 103,
    name: "Flexibility Focus",
    description: "Improve mobility with guided stretching routines",
    image: "/placeholder.svg?key=flex",
    participants: 289,
    duration: "4 weeks",
    difficulty: "All Levels",
    category: "Mobility",
  },
  {
    id: 104,
    name: "Protein Power Month",
    description: "Daily high-protein recipe ideas and tracking",
    image: "/placeholder.svg?key=protein",
    participants: 412,
    duration: "30 days",
    difficulty: "All Levels",
    category: "Nutrition",
  },
  {
    id: 105,
    name: "Mindful Mornings",
    description: "Start each day with breathing and light movement",
    image: "/placeholder.svg?key=morning",
    participants: 367,
    duration: "21 days",
    difficulty: "All Levels",
    category: "Wellness",
  },
  {
    id: 106,
    name: "Consistency Club",
    description: "Commit to 20 minutes of activity every day",
    image: "/placeholder.svg?key=consistency",
    participants: 965,
    duration: "30 days",
    difficulty: "All Levels",
    category: "Habits",
  },
]

export function ChallengeGrid() {
  return (
    <div className="space-y-4">
      <h2 className="font-sans text-lg font-semibold">All Challenges</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden">
            <img
              src={challenge.image || "/placeholder.svg"}
              alt={challenge.name}
              className="w-full h-36 object-cover"
            />
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-semibold text-sm">{challenge.name}</h3>
                <Badge variant="secondary">{challenge.category}</Badge>
              </div>
              <p className="font-serif text-sm text-muted-foreground">{challenge.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {challenge.participants}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {challenge.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {challenge.difficulty}
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  Reward
                </div>
              </div>
              <Button className="w-full">Join</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
