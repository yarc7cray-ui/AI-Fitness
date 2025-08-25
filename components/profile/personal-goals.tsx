"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Target, Plus, Edit } from "lucide-react"

const goals = [
  {
    id: 1,
    title: "Lose 12kg",
    current: 8.5,
    target: 12,
    unit: "kg",
    progress: 71,
    deadline: "Dec 2024",
  },
  {
    id: 2,
    title: "Run 5km under 25min",
    current: 27,
    target: 25,
    unit: "min",
    progress: 85,
    deadline: "Nov 2024",
  },
  {
    id: 3,
    title: "Workout 5x per week",
    current: 4,
    target: 5,
    unit: "days",
    progress: 80,
    deadline: "Ongoing",
  },
]

export function PersonalGoals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Personal Goals
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Goal
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-3 p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{goal.title}</h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  {goal.current} / {goal.target} {goal.unit}
                </span>
                <span className="text-muted-foreground">{goal.deadline}</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{goal.progress}% complete</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
