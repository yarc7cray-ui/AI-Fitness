import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Dumbbell, Apple, Play } from "lucide-react"

export function TodaysPlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-xl flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Today's Plan
        </CardTitle>
        <CardDescription className="font-serif">
          Your AI coach has prepared a personalized plan for today
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Workout Plan */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-foreground">Upper Body Strength</h3>
            <p className="font-serif text-sm text-muted-foreground mb-2">45 min • 6 exercises • Intermediate level</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                Push-ups
              </Badge>
              <Badge variant="outline" className="text-xs">
                Pull-ups
              </Badge>
              <Badge variant="outline" className="text-xs">
                Dumbbell Press
              </Badge>
            </div>
            <Button size="sm" className="gradient-primary text-white hover:opacity-90">
              <Play className="mr-2 h-3 w-3" />
              Start Workout
            </Button>
          </div>
        </div>

        {/* Nutrition Plan */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
            <Apple className="h-5 w-5 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-foreground">Meal Suggestions</h3>
            <p className="font-serif text-sm text-muted-foreground mb-2">
              Optimized for your muscle gain goal • 2,200 calories
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs font-serif">
              <div className="text-center p-2 bg-background rounded">
                <div className="font-semibold">Breakfast</div>
                <div className="text-muted-foreground">Oatmeal & Berries</div>
              </div>
              <div className="text-center p-2 bg-background rounded">
                <div className="font-semibold">Lunch</div>
                <div className="text-muted-foreground">Chicken Salad</div>
              </div>
              <div className="text-center p-2 bg-background rounded">
                <div className="font-semibold">Dinner</div>
                <div className="text-muted-foreground">Salmon & Rice</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
