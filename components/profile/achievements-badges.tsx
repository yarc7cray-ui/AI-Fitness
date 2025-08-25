"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Flame, Target, Users, Calendar, Star } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "First Workout",
    description: "Completed your first workout",
    icon: Trophy,
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    earned: true,
  },
  {
    id: 2,
    title: "7 Day Streak",
    description: "Worked out 7 days in a row",
    icon: Flame,
    color: "bg-gradient-to-r from-red-400 to-pink-500",
    earned: true,
  },
  {
    id: 3,
    title: "Goal Crusher",
    description: "Achieved your weight loss goal",
    icon: Target,
    color: "bg-gradient-to-r from-green-400 to-blue-500",
    earned: true,
  },
  {
    id: 4,
    title: "Social Butterfly",
    description: "Added 10 friends",
    icon: Users,
    color: "bg-gradient-to-r from-purple-400 to-pink-500",
    earned: true,
  },
  {
    id: 5,
    title: "30 Day Challenge",
    description: "Complete 30 day challenge",
    icon: Calendar,
    color: "bg-gradient-to-r from-blue-400 to-cyan-500",
    earned: false,
  },
  {
    id: 6,
    title: "Perfect Week",
    description: "Hit all goals for a week",
    icon: Star,
    color: "bg-gradient-to-r from-indigo-400 to-purple-500",
    earned: false,
  },
]

export function AchievementsBadges() {
  const earnedCount = achievements.filter((a) => a.earned).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Achievements
          <Badge variant="secondary">
            {earnedCount}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border-2 transition-all ${
                achievement.earned ? "border-primary/20 bg-primary/5" : "border-muted bg-muted/50 opacity-60"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`p-2 rounded-full ${achievement.earned ? achievement.color : "bg-muted"}`}>
                  <achievement.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
