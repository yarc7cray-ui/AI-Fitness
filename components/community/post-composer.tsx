"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, ImageIcon, MapPin, Smile } from "lucide-react"

export function PostComposer() {
  const [postContent, setPostContent] = useState("")

  const handlePost = () => {
    if (postContent.trim()) {
      // Handle post submission
      console.log("Posting:", postContent)
      setPostContent("")
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/user-profile-illustration.png" alt="You" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Share your fitness journey, achievements, or motivate others..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[100px] resize-none border-0 bg-muted/50 focus-visible:ring-1"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Camera className="h-4 w-4 mr-1" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Progress
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <MapPin className="h-4 w-4 mr-1" />
                  Location
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Smile className="h-4 w-4 mr-1" />
                  Feeling
                </Button>
              </div>
              <Button
                onClick={handlePost}
                disabled={!postContent.trim()}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
