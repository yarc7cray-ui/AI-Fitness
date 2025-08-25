import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Users } from "lucide-react"

const friendSuggestions = [
  {
    id: 1,
    name: "Jessica Park",
    avatar: "/placeholder.svg?key=friend1",
    initials: "JP",
    mutualFriends: 3,
    workoutStreak: 12,
    commonInterests: ["HIIT", "Yoga"],
  },
  {
    id: 2,
    name: "David Kim",
    avatar: "/placeholder.svg?key=friend2",
    initials: "DK",
    mutualFriends: 5,
    workoutStreak: 8,
    commonInterests: ["Strength", "Running"],
  },
  {
    id: 3,
    name: "Lisa Martinez",
    avatar: "/placeholder.svg?key=friend3",
    initials: "LM",
    mutualFriends: 2,
    workoutStreak: 15,
    commonInterests: ["Pilates", "Nutrition"],
  },
]

export function FriendSuggestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Friend Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {friendSuggestions.map((friend) => (
          <div key={friend.id} className="flex items-center gap-3 p-3 rounded-lg border">
            <Avatar className="h-10 w-10">
              <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
              <AvatarFallback>{friend.initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <h3 className="font-sans font-semibold text-sm">{friend.name}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{friend.mutualFriends} mutual friends</span>
                <span>•</span>
                <span>{friend.workoutStreak} day streak</span>
              </div>
              <div className="flex gap-1">
                {friend.commonInterests.slice(0, 2).map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <Button size="sm" variant="outline">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button variant="ghost" size="sm" className="w-full">
          See More Suggestions
        </Button>
      </CardContent>
    </Card>
  )
}
