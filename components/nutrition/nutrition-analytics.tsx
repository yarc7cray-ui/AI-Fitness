import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

const weeklyStats = [
  {
    metric: "Average Calories",
    current: 1850,
    target: 2000,
    change: -5.2,
    trend: "down",
    status: "good",
  },
  {
    metric: "Protein Goal",
    current: 85,
    target: 120,
    change: +12.5,
    trend: "up",
    status: "improving",
  },
  {
    metric: "Water Intake",
    current: 7.2,
    target: 8,
    change: +8.3,
    trend: "up",
    status: "good",
  },
  {
    metric: "Meal Consistency",
    current: 92,
    target: 100,
    change: +3.1,
    trend: "up",
    status: "excellent",
  },
]

export function NutritionAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" />
          Weekly Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {weeklyStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
            <div className="space-y-1">
              <h3 className="font-sans font-semibold text-sm">{stat.metric}</h3>
              <div className="flex items-center gap-2">
                <span className="font-sans text-lg font-bold">
                  {typeof stat.current === "number" && stat.current % 1 !== 0 ? stat.current.toFixed(1) : stat.current}
                </span>
                <span className="font-serif text-xs text-muted-foreground">
                  / {stat.target}{" "}
                  {stat.metric.includes("Calories")
                    ? "kcal"
                    : stat.metric.includes("Protein")
                      ? "g"
                      : stat.metric.includes("Water")
                        ? "glasses"
                        : "%"}
                </span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div
                className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {Math.abs(stat.change)}%
              </div>
              <Badge variant={stat.status === "excellent" ? "default" : "secondary"} className="text-xs">
                {stat.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
