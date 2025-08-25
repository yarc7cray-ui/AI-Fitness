"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Share2, Settings, Camera } from "lucide-react"

export function ProfileHeader() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/user-profile-illustration.png" alt="Profile" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">Fitness Enthusiast • Member since Jan 2024</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">28 Day Streak</Badge>
              <Badge variant="secondary">Weight Loss Goal</Badge>
              <Badge variant="secondary">Intermediate Level</Badge>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
