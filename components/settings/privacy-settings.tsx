"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Shield, Download, Trash2 } from "lucide-react"

const privacySettings = [
  {
    id: "profile-visibility",
    title: "Public Profile",
    description: "Allow others to find and view your profile",
    enabled: true,
  },
  {
    id: "workout-sharing",
    title: "Share Workouts",
    description: "Automatically share completed workouts with friends",
    enabled: false,
  },
  {
    id: "progress-sharing",
    title: "Share Progress",
    description: "Allow friends to see your fitness progress",
    enabled: true,
  },
  {
    id: "location-sharing",
    title: "Location Sharing",
    description: "Share your workout location with the community",
    enabled: false,
  },
]

export function PrivacySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Privacy & Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {privacySettings.map((setting) => (
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
        </div>

        <div className="border-t pt-4 space-y-3">
          <h4 className="font-medium">Data Management</h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export My Data
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
