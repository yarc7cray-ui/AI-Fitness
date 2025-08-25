"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell } from "lucide-react"

const notificationSettings = [
  {
    id: "workout-reminders",
    title: "Workout Reminders",
    description: "Get notified when it's time for your scheduled workout",
    enabled: true,
  },
  {
    id: "meal-reminders",
    title: "Meal Reminders",
    description: "Reminders to log your meals and stay on track",
    enabled: true,
  },
  {
    id: "achievement-alerts",
    title: "Achievement Alerts",
    description: "Celebrate your milestones and achievements",
    enabled: true,
  },
  {
    id: "social-updates",
    title: "Social Updates",
    description: "Friend activities, challenges, and community updates",
    enabled: false,
  },
  {
    id: "weekly-reports",
    title: "Weekly Reports",
    description: "Summary of your weekly progress and insights",
    enabled: true,
  },
  {
    id: "marketing-emails",
    title: "Marketing Emails",
    description: "Tips, promotions, and product updates",
    enabled: false,
  },
]

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notificationSettings.map((setting) => (
          <div key={setting.id} className="flex items-start justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor={setting.id} className="font-medium">
                {setting.title}
              </Label>
              <p className="text-sm text-muted-foreground">{setting.description}</p>
            </div>
            <Switch id={setting.id} defaultChecked={setting.enabled} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
