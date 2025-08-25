import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Camera, Utensils, Dumbbell, Timer } from "lucide-react"

const actions = [
  {
    title: "Log Workout",
    description: "Record your exercise session",
    icon: Dumbbell,
    color: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  {
    title: "Log Meal",
    description: "Track your nutrition intake",
    icon: Utensils,
    color: "bg-secondary/10 text-secondary hover:bg-secondary/20",
  },
  {
    title: "Progress Photo",
    description: "Upload transformation pic",
    icon: Camera,
    color: "bg-accent/10 text-accent hover:bg-accent/20",
  },
  {
    title: "Quick Timer",
    description: "Start workout timer",
    icon: Timer,
    color: "bg-muted text-muted-foreground hover:bg-muted/80",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action, index) => (
          <Button key={index} variant="ghost" className={`h-auto p-4 justify-start ${action.color}`}>
            <action.icon className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-sans font-medium">{action.title}</div>
              <div className="font-serif text-xs opacity-80">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
