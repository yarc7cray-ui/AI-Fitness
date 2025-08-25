import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, Target, Zap } from "lucide-react"

const personalRecords = [
  {
    exercise: "Push-ups",
    record: "25 reps",
    type: "Max Reps",
    date: "2 weeks ago",
    improvement: "+5",
    icon: Target,
  },
  {
    exercise: "Deadlift",
    record: "120 kg",
    type: "Max Weight",
    date: "1 week ago",
    improvement: "+10kg",
    icon: Trophy,
  },
  {
    exercise: "Plank",
    record: "3:45",
    type: "Max Time",
    date: "3 days ago",
    improvement: "+45s",
    icon: Zap,
  },
  {
    exercise: "Squats",
    record: "50 reps",
    type: "Max Reps",
    date: "5 days ago",
    improvement: "+10",
    icon: Target,
  },
]

export function PersonalRecords() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-xl flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Personal Records
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {personalRecords.map((record, index) => (
          <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-accent/5 to-primary/5 border">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <record.icon className="h-4 w-4 text-primary" />
                <h3 className="font-sans font-semibold text-sm">{record.exercise}</h3>
              </div>
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="mr-1 h-3 w-3" />
                {record.improvement}
              </Badge>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="font-sans text-lg font-bold text-foreground">{record.record}</div>
                <div className="font-serif text-xs text-muted-foreground">{record.type}</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-xs text-muted-foreground">{record.date}</div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
