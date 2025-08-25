import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Target } from "lucide-react"

const suggestions = [
  {
    title: "Upper Body Blast",
    duration: "45 min",
    exercises: 6,
    focus: "Strength",
    description: "AI-generated workout based on your recent progress",
  },
  {
    title: "HIIT Cardio",
    duration: "20 min",
    exercises: 4,
    focus: "Cardio",
    description: "High-intensity interval training for fat burning",
  },
  {
    title: "Core & Stability",
    duration: "30 min",
    exercises: 5,
    focus: "Core",
    description: "Targeted core workout with stability challenges",
  },
]

export function AIWorkoutSuggestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="p-3 rounded-lg border hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-sans font-medium text-sm">{suggestion.title}</h3>
              <Badge variant="outline" className="text-xs">
                {suggestion.focus}
              </Badge>
            </div>
            <p className="font-serif text-xs text-muted-foreground mb-3">{suggestion.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span className="font-serif">{suggestion.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  <span className="font-serif">{suggestion.exercises} exercises</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">
                Start
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
