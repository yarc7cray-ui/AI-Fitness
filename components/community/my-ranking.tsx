import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Trophy, Target } from "lucide-react"

export function MyRanking() {
  return (
    <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?key=myavatar" alt="You" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <Badge className="absolute -bottom-1 -right-1 h-6 w-6 p-0 text-xs bg-primary">#127</Badge>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-lg font-semibold">Your Ranking</h3>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="font-sans text-sm font-medium">+15</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-sans text-xl font-bold text-primary">2,450</div>
                <div className="font-serif text-xs text-muted-foreground">Points</div>
              </div>
              <div>
                <div className="font-sans text-xl font-bold text-accent">18</div>
                <div className="font-serif text-xs text-muted-foreground">Workouts</div>
              </div>
              <div>
                <div className="font-sans text-xl font-bold text-yellow-600">5</div>
                <div className="font-serif text-xs text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4" />
            <span className="font-serif">Next goal: Top 100</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="h-4 w-4" />
            <span className="font-serif">73 points to go</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
