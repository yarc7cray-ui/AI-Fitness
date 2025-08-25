import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Trophy, Target, Flame } from "lucide-react"

const feedPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?key=user1",
      initials: "SC",
    },
    type: "workout_complete",
    content: "Just crushed a 45-minute HIIT session! Feeling stronger every day 💪",
    workout: {
      name: "HIIT Cardio Blast",
      duration: "45 min",
      calories: 420,
    },
    timestamp: "2 hours ago",
    likes: 12,
    comments: 3,
    achievement: "Personal Best",
  },
  {
    id: 2,
    user: {
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?key=user2",
      initials: "MR",
    },
    type: "challenge_complete",
    content: "Week 2 of the 30-Day Push-up Challenge complete! Who's joining me?",
    challenge: {
      name: "30-Day Push-up Challenge",
      progress: "14/30 days",
      participants: 156,
    },
    timestamp: "4 hours ago",
    likes: 8,
    comments: 5,
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?key=user3",
      initials: "EW",
    },
    type: "milestone",
    content: "Hit my goal weight! Thank you to this amazing community for the support 🎉",
    milestone: {
      type: "Weight Goal",
      achievement: "Lost 15 lbs",
    },
    timestamp: "6 hours ago",
    likes: 24,
    comments: 8,
    achievement: "Goal Achieved",
  },
  {
    id: 4,
    user: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?key=user4",
      initials: "AT",
    },
    type: "recipe_share",
    content: "Made this amazing post-workout protein smoothie bowl. Recipe in comments!",
    recipe: {
      name: "Berry Protein Bowl",
      calories: 320,
      protein: 28,
    },
    timestamp: "8 hours ago",
    likes: 15,
    comments: 6,
  },
]

export function SocialFeed() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-lg font-semibold">Community Feed</h2>
        <Button variant="outline" size="sm">
          Share Update
        </Button>
      </div>

      <div className="space-y-4">
        {feedPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                    <AvatarFallback>{post.user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans font-semibold text-sm">{post.user.name}</h3>
                      {post.achievement && (
                        <Badge variant="secondary" className="text-xs">
                          <Trophy className="mr-1 h-3 w-3" />
                          {post.achievement}
                        </Badge>
                      )}
                    </div>
                    <p className="font-serif text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="font-serif text-sm">{post.content}</p>

              {post.workout && (
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-sans font-semibold text-sm">{post.workout.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {post.workout.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-3 w-3" />
                          {post.workout.calories} kcal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {post.challenge && (
                <div className="p-3 rounded-lg bg-gradient-to-r from-accent/5 to-primary/5 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-sans font-semibold text-sm">{post.challenge.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <div>{post.challenge.progress}</div>
                        <div>{post.challenge.participants} participants</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                </div>
              )}

              {post.milestone && (
                <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <div>
                      <h4 className="font-sans font-semibold text-sm">{post.milestone.type}</h4>
                      <p className="font-serif text-xs text-muted-foreground">{post.milestone.achievement}</p>
                    </div>
                  </div>
                </div>
              )}

              {post.recipe && (
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-sans font-semibold text-sm">{post.recipe.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <div>{post.recipe.calories} kcal</div>
                        <div>{post.recipe.protein}g protein</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
