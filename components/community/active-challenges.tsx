import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, Target } from "lucide-react"

const activeChallenges = [
  {
    id: 1,
    name: "30-Day Push-up Challenge",
    description: "Build upper body strength",
    participants: 156,
    daysLeft: 16,
    progress: 46.7,
    myProgress: "14/30 days",
    reward: "Strength Badge",
    category: "Strength",
  },
  {
    id: 2,
    name: "10K Steps Daily",
    description: "Stay active every day",
    participants: 89,
    daysLeft: 23,
    progress: 23.3,
    myProgress: "7/30 days",
    reward: "Walker Badge",
    category: "Cardio",
  },
  {
    id: 3,
    name: "Hydration Hero",
    description: "Drink 8 glasses daily",
    participants: 203,
    daysLeft: 9,
    progress: 70,
    myProgress: "21/30 days",
    reward: "Hydration Badge",
    category: "Wellness",
  },
]

export function ActiveChallenges() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-sans text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            Active Challenges
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeChallenges.map((challenge) => (
          <div key={challenge.id} className="p-4 rounded-lg border bg-gradient-to-r from-accent/5 to-primary/5">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-sans font-semibold text-sm">{challenge.name}</h3>
                  <p className="font-serif text-xs text-muted-foreground">{challenge.description}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {challenge.category}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif text-muted-foreground">Progress: {challenge.myProgress}</span>
                  <span className="font-sans font-medium">{challenge.progress.toFixed(0)}%</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {challenge.participants}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {challenge.daysLeft} days left
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {challenge.reward}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
