"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, TrendingUp, Target } from "lucide-react"

const timelineEvents = [
  {
    id: 1,
    date: "Today",
    title: "Completed Upper Body Workout",
    description: "45 minutes • 8 exercises • 320 calories burned",
    type: "workout",
    completed: true,
  },
  {
    id: 2,
    date: "Yesterday",
    title: "Reached Daily Calorie Goal",
    description: "1,850 calories consumed • Perfect macro balance",
    type: "nutrition",
    completed: true,
  },
  {
    id: 3,
    date: "2 days ago",
    title: "New Personal Record",
    description: "Bench Press: 80kg • Previous: 75kg",
    type: "achievement",
    completed: true,
  },
  {
    id: 4,
    date: "3 days ago",
    title: "Completed Cardio Session",
    description: "30 minutes running • 5km distance • 280 calories",
    type: "workout",
    completed: true,
  },
  {
    id: 5,
    date: "4 days ago",
    title: "Weekly Weigh-in",
    description: "Lost 0.5kg this week • Total: -8.5kg",
    type: "progress",
    completed: true,
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "workout":
      return <TrendingUp className="h-4 w-4" />
    case "achievement":
      return <Target className="h-4 w-4" />
    default:
      return <Circle className="h-4 w-4" />
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "workout":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Workout</Badge>
    case "nutrition":
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Nutrition</Badge>
    case "achievement":
      return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Achievement</Badge>
    case "progress":
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Progress</Badge>
    default:
      return <Badge variant="secondary">{type}</Badge>
  }
}

export function ProgressTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  {event.completed ? <CheckCircle className="h-4 w-4 text-primary" /> : getTypeIcon(event.type)}
                </div>
                {index < timelineEvents.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-2">
                    {getTypeBadge(event.type)}
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
