import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Target, Droplets, Activity } from "lucide-react"

const nutritionStats = [
  {
    label: "Calories",
    current: 1450,
    target: 2000,
    unit: "kcal",
    icon: Flame,
    color: "text-orange-500",
    progress: 72.5,
  },
  {
    label: "Protein",
    current: 85,
    target: 120,
    unit: "g",
    icon: Target,
    color: "text-primary",
    progress: 70.8,
  },
  {
    label: "Carbs",
    current: 180,
    target: 250,
    unit: "g",
    icon: Activity,
    color: "text-accent",
    progress: 72,
  },
  {
    label: "Water",
    current: 6,
    target: 8,
    unit: "glasses",
    icon: Droplets,
    color: "text-blue-500",
    progress: 75,
  },
]

export function DailyNutritionStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg">Today's Nutrition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {nutritionStats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="font-serif text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-sans text-lg font-bold">{stat.current}</span>
                  <span className="font-serif text-xs text-muted-foreground">
                    / {stat.target} {stat.unit}
                  </span>
                </div>
                <Progress value={stat.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
