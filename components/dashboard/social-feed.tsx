import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Users, Trophy } from "lucide-react"

const feedItems = [
  {
    user: "Sarah M.",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "completed",
    content: "30-Day Abs Challenge",
    time: "2h ago",
    likes: 12,
    comments: 3,
    type: "challenge",
  },
  {
    user: "Mike C.",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "achieved",
    content: "New PR: 100kg Deadlift!",
    time: "4h ago",
    likes: 24,
    comments: 8,
    type: "achievement",
  },
  {
    user: "Emma R.",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "joined",
    content: "Morning Runners Group",
    time: "6h ago",
    likes: 5,
    comments: 1,
    type: "community",
  },
]

export function SocialFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg flex items-center gap-2">
          <Users className="h-4 w-4" />
          Community Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedItems.map((item, index) => (
          <div key={index} className="flex gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.avatar || "/placeholder.svg"} />
              <AvatarFallback className="font-sans text-xs">
                {item.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-sans font-medium text-sm">{item.user}</span>
                <span className="font-serif text-xs text-muted-foreground">{item.action}</span>
                {item.type === "challenge" && <Trophy className="h-3 w-3 text-accent" />}
              </div>
              <p className="font-serif text-sm text-foreground mb-2">{item.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Heart className="mr-1 h-3 w-3" />
                    {item.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <MessageCircle className="mr-1 h-3 w-3" />
                    {item.comments}
                  </Button>
                </div>
                <span className="font-serif text-xs text-muted-foreground">{item.time}</span>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  )
}
