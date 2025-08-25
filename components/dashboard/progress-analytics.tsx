import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Award } from "lucide-react"

export function ProgressAnalytics() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Weight Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-secondary" />
            Weight Progress
          </CardTitle>
          <CardDescription className="font-serif">Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-sans text-3xl font-bold text-foreground">72.5</span>
            <span className="font-serif text-muted-foreground">kg</span>
            <Badge variant="secondary" className="ml-2">
              -2.5kg
            </Badge>
          </div>
          <div className="h-32 bg-muted/30 rounded-lg flex items-end justify-center p-4">
            <div className="font-serif text-sm text-muted-foreground">Chart visualization would go here</div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg flex items-center gap-2">
            <Award className="h-4 w-4 text-accent" />
            Recent Achievements
          </CardTitle>
          <CardDescription className="font-serif">Badges earned this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
            <div className="h-8 w-8 bg-accent/20 rounded-full flex items-center justify-center">🔥</div>
            <div>
              <div className="font-sans font-medium text-sm">7-Day Streak</div>
              <div className="font-serif text-xs text-muted-foreground">Completed daily workouts</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
            <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">💪</div>
            <div>
              <div className="font-sans font-medium text-sm">Strength Builder</div>
              <div className="font-serif text-xs text-muted-foreground">Increased bench press by 10kg</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
            <div className="h-8 w-8 bg-secondary/20 rounded-full flex items-center justify-center">🥗</div>
            <div>
              <div className="font-sans font-medium text-sm">Nutrition Master</div>
              <div className="font-serif text-xs text-muted-foreground">Hit macro targets 5 days straight</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calorie Analytics */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-sans text-lg flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Calorie Balance
          </CardTitle>
          <CardDescription className="font-serif">Intake vs Burn - Last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="font-sans text-2xl font-bold text-secondary">1,850</div>
              <div className="font-serif text-sm text-muted-foreground">Avg Daily Intake</div>
            </div>
            <div className="text-center">
              <div className="font-sans text-2xl font-bold text-accent">2,100</div>
              <div className="font-serif text-sm text-muted-foreground">Avg Daily Burn</div>
            </div>
          </div>
          <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="font-serif text-sm text-muted-foreground">
              Weekly calorie balance chart would be displayed here
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
