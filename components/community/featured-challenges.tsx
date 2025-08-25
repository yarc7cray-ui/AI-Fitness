import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, Target, Star } from "lucide-react"

const featuredChallenges = [
  {
    id: 1,
    name: "Summer Shred Challenge",
    description: "8-week transformation program with personalized workouts and nutrition",
    image: "/placeholder.svg?key=challenge1",
    participants: 1247,
    duration: "8 weeks",
    difficulty: "Intermediate",
    reward: "Transformation Badge + Premium Month",
    category: "Transformation",
    featured: true,
    startDate: "July 1st",
  },
  {
    id: 2,
    name: "Morning Warrior Challenge",
    description: "Start your day strong with 30 days of morning workouts",
    image: "/placeholder.svg?key=challenge2",
    participants: 892,
    duration: "30 days",
    difficulty: "Beginner",
    reward: "Early Bird Badge",
    category: "Habit Building",
    featured: true,
    startDate: "Every Monday",
  },
]

export function FeaturedChallenges() {
  return (
    <div className="space-y-4">
      <h2 className="font-sans text-lg font-semibold">Featured Challenges</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {featuredChallenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={challenge.image || "/placeholder.svg"}
                alt={challenge.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-yellow-500 text-black">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Featured
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="secondary">{challenge.category}</Badge>
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-sans font-semibold">{challenge.name}</h3>
                <p className="font-serif text-sm text-muted-foreground mt-1">{challenge.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {challenge.participants} joined
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
                  Rewards
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-serif text-xs text-muted-foreground">
                  <strong>Reward:</strong> {challenge.reward}
                </p>
                <p className="font-serif text-xs text-muted-foreground">
                  <strong>Starts:</strong> {challenge.startDate}
                </p>
              </div>

              <Button className="w-full">Join Challenge</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
