import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Crown, UserPlus } from "lucide-react"

const topPerformers = [
  {
    rank: 1,
    name: "Alex Champion",
    avatar: "/placeholder.svg?key=top1",
    initials: "AC",
    points: 4850,
    workouts: 45,
    badges: 12,
    streak: 28,
    icon: Crown,
    iconColor: "text-yellow-500",
  },
  {
    rank: 2,
    name: "Maria Fitness",
    avatar: "/placeholder.svg?key=top2",
    initials: "MF",
    points: 4720,
    workouts: 42,
    badges: 11,
    streak: 25,
    icon: Trophy,
    iconColor: "text-gray-400",
  },
  {
    rank: 3,
    name: "John Strong",
    avatar: "/placeholder.svg?key=top3",
    initials: "JS",
    points: 4650,
    workouts: 40,
    badges: 10,
    streak: 22,
    icon: Medal,
    iconColor: "text-amber-600",
  },
]

const otherTopPerformers = [
  {
    rank: 4,
    name: "Sarah Power",
    avatar: "/placeholder.svg?key=top4",
    initials: "SP",
    points: 4580,
    workouts: 38,
    change: "+2",
  },
  {
    rank: 5,
    name: "Mike Beast",
    avatar: "/placeholder.svg?key=top5",
    initials: "MB",
    points: 4520,
    workouts: 37,
    change: "-1",
  },
  {
    rank: 6,
    name: "Lisa Warrior",
    avatar: "/placeholder.svg?key=top6",
    initials: "LW",
    points: 4480,
    workouts: 36,
    change: "+3",
  },
]

export function TopPerformers() {
  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg text-center">Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-center gap-4 mb-6">
            {/* 2nd Place */}
            <div className="text-center space-y-2">
              <div className="relative">
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarImage src={topPerformers[1].avatar || "/placeholder.svg"} alt={topPerformers[1].name} />
                  <AvatarFallback>{topPerformers[1].initials}</AvatarFallback>
                </Avatar>
                {topPerformers[1].icon &&
                  (() => {
                    const IconComponent = topPerformers[1].icon
                    return (
                      <IconComponent className={`absolute -top-2 -right-2 h-6 w-6 ${topPerformers[1].iconColor}`} />
                    )
                  })()}
              </div>
              <div className="bg-gray-200 h-20 w-20 mx-auto rounded-t-lg flex items-end justify-center pb-2">
                <span className="font-sans text-2xl font-bold text-gray-600">2</span>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-sm">{topPerformers[1].name}</h3>
                <p className="font-serif text-xs text-muted-foreground">{topPerformers[1].points} pts</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center space-y-2">
              <div className="relative">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarImage src={topPerformers[0].avatar || "/placeholder.svg"} alt={topPerformers[0].name} />
                  <AvatarFallback>{topPerformers[0].initials}</AvatarFallback>
                </Avatar>
                {topPerformers[0].icon &&
                  (() => {
                    const IconComponent = topPerformers[0].icon
                    return (
                      <IconComponent className={`absolute -top-2 -right-2 h-8 w-8 ${topPerformers[0].iconColor}`} />
                    )
                  })()}
              </div>
              <div className="bg-yellow-400 h-24 w-20 mx-auto rounded-t-lg flex items-end justify-center pb-2">
                <span className="font-sans text-2xl font-bold text-yellow-800">1</span>
              </div>
              <div>
                <h3 className="font-sans font-semibold">{topPerformers[0].name}</h3>
                <p className="font-serif text-sm text-muted-foreground">{topPerformers[0].points} pts</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {topPerformers[0].streak} day streak
                </Badge>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center space-y-2">
              <div className="relative">
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarImage src={topPerformers[2].avatar || "/placeholder.svg"} alt={topPerformers[2].name} />
                  <AvatarFallback>{topPerformers[2].initials}</AvatarFallback>
                </Avatar>
                {topPerformers[2].icon &&
                  (() => {
                    const IconComponent = topPerformers[2].icon
                    return (
                      <IconComponent className={`absolute -top-2 -right-2 h-6 w-6 ${topPerformers[2].iconColor}`} />
                    )
                  })()}
              </div>
              <div className="bg-amber-600 h-16 w-20 mx-auto rounded-t-lg flex items-end justify-center pb-2">
                <span className="font-sans text-2xl font-bold text-amber-100">3</span>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-sm">{topPerformers[2].name}</h3>
                <p className="font-serif text-xs text-muted-foreground">{topPerformers[2].points} pts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {otherTopPerformers.map((performer) => (
            <div key={performer.rank} className="flex items-center gap-4 p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="font-sans font-bold text-sm">{performer.rank}</span>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={performer.avatar || "/placeholder.svg"} alt={performer.name} />
                  <AvatarFallback>{performer.initials}</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <h3 className="font-sans font-semibold text-sm">{performer.name}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{performer.points} points</span>
                  <span>{performer.workouts} workouts</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={performer.change.startsWith("+") ? "default" : "secondary"} className="text-xs">
                  {performer.change}
                </Badge>
                <Button variant="ghost" size="sm">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
