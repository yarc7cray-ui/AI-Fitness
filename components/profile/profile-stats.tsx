"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Calendar, Award } from "lucide-react"

const stats = [
  {
    title: "Total Workouts",
    value: "156",
    change: "+12 this month",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    title: "Weight Progress",
    value: "-8.5 kg",
    change: "Goal: -12 kg",
    icon: Target,
    color: "text-blue-500",
  },
  {
    title: "Active Days",
    value: "89%",
    change: "Last 30 days",
    icon: Calendar,
    color: "text-purple-500",
  },
  {
    title: "Achievements",
    value: "24",
    change: "3 new this week",
    icon: Award,
    color: "text-orange-500",
  },
]

export function ProfileStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="font-medium">{stat.title}</span>
                </div>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <div className="space-y-2">
                <Progress value={75} className="h-2" />
                <p className="text-sm text-muted-foreground">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
