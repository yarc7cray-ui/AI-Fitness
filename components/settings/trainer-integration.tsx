"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Plus, MessageCircle, Calendar } from "lucide-react"

const connectedTrainers = [
  {
    id: 1,
    name: "Sarah Wilson",
    specialty: "Weight Loss Specialist",
    avatar: "/fitness-woman.png",
    status: "active",
    nextSession: "Tomorrow 2:00 PM",
  },
]

export function TrainerIntegration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Personal Trainers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {connectedTrainers.length > 0 ? (
          <div className="space-y-4">
            {connectedTrainers.map((trainer) => (
              <div key={trainer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={trainer.avatar || "/placeholder.svg"} alt={trainer.name} />
                    <AvatarFallback>
                      {trainer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{trainer.name}</p>
                    <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
                    <p className="text-xs text-muted-foreground">Next: {trainer.nextSession}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{trainer.status}</Badge>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">No trainers connected</p>
              <p className="text-sm text-muted-foreground">
                Connect with certified personal trainers for personalized guidance
              </p>
            </div>
          </div>
        )}

        <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Find a Personal Trainer
        </Button>
      </CardContent>
    </Card>
  )
}
