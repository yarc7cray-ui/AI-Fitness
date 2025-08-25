import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Target, Zap, Trophy } from "lucide-react"

const stats = [
  {
    title: "Calories Burned",
    value: "420",
    target: "500",
    unit: "kcal",
    progress: 84,
    icon: Flame,
    color: "text-accent",
  },
  {
    title: "Daily Goal",
    value: "2",
    target: "3",
    unit: "workouts",
    progress: 67,
    icon: Target,
    color: "text-primary",
  },
  {
    title: "Active Minutes",
    value: "45",
    target: "60",
    unit: "min",
    progress: 75,
    icon: Zap,
    color: "text-secondary",
  },
  {
    title: "Streak",
    value: "7",
    target: "30",
    unit: "days",
    progress: 23,
    icon: Trophy,
    color: "text-accent",
  },
]

export function DailyStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-sans text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="font-sans text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="font-serif text-sm text-muted-foreground">
                / {stat.target} {stat.unit}
              </div>
            </div>
            <Progress value={stat.progress} className="h-2" />
            <div className="mt-1 font-serif text-xs text-muted-foreground">{stat.progress}% complete</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
