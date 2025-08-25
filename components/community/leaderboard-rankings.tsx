"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"

const leaderboardData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/fitness-woman.png",
    points: 2850,
    rank: 1,
    streak: 28,
    badge: "Champion",
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/fitness-man.png",
    points: 2720,
    rank: 2,
    streak: 25,
    badge: "Elite",
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "/fitness-woman-athlete.png",
    points: 2650,
    rank: 3,
    streak: 22,
    badge: "Pro",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    avatar: "/fitness-man-runner.png",
    points: 2480,
    rank: 4,
    streak: 19,
    badge: "Advanced",
  },
  {
    id: 5,
    name: "Lisa Wang",
    avatar: "/fitness-woman-yoga.png",
    points: 2350,
    rank: 5,
    streak: 16,
    badge: "Rising Star",
  },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
  }
}

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Champion":
      return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
    case "Elite":
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
    case "Pro":
      return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
    case "Advanced":
      return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
  }
}

export function LeaderboardRankings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Top Performers This Week
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaderboardData.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.streak} day streak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{user.points.toLocaleString()}</p>
              <Badge className={`text-xs ${getBadgeColor(user.badge)}`}>{user.badge}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
