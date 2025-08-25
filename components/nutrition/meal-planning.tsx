import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Sparkles, Plus } from "lucide-react"

const mealPlan = [
  {
    meal: "Breakfast",
    time: "8:00 AM",
    recipe: "Protein Oatmeal Bowl",
    calories: 350,
    protein: 25,
    image: "/protein-oatmeal-bowl.png",
    aiSuggested: true,
  },
  {
    meal: "Lunch",
    time: "12:30 PM",
    recipe: "Grilled Chicken Salad",
    calories: 420,
    protein: 35,
    image: "/grilled-chicken-salad.png",
    aiSuggested: false,
  },
  {
    meal: "Snack",
    time: "3:30 PM",
    recipe: "Greek Yogurt & Berries",
    calories: 180,
    protein: 15,
    image: "/greek-yogurt-berries.png",
    aiSuggested: true,
  },
  {
    meal: "Dinner",
    time: "7:00 PM",
    recipe: "Salmon with Quinoa",
    calories: 480,
    protein: 40,
    image: "/salmon-quinoa-dinner.png",
    aiSuggested: false,
  },
]

export function MealPlanning() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-sans text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Today's Meal Plan
          </CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Meal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mealPlan.map((meal, index) => (
          <div key={index} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
            <img
              src={meal.image || "/placeholder.svg"}
              alt={meal.recipe}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-semibold text-sm">{meal.meal}</h3>
                {meal.aiSuggested && (
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI
                  </Badge>
                )}
              </div>
              <p className="font-serif text-sm text-muted-foreground">{meal.recipe}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {meal.time}
                </div>
                <div>{meal.calories} kcal</div>
                <div>{meal.protein}g protein</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Log
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
