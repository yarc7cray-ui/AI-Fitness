import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Flame, Heart, BookOpen } from "lucide-react"

const recipes = [
  {
    id: 1,
    title: "Grilled Chicken & Vegetables",
    image: "/grilled-chicken-vegetables.png",
    cookTime: "25 min",
    servings: 3,
    calories: 380,
    protein: 35,
    tags: ["High Protein", "Low Carb"],
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Salmon Avocado Bowl",
    image: "/salmon-avocado-bowl.png",
    cookTime: "20 min",
    servings: 2,
    calories: 450,
    protein: 32,
    tags: ["Omega-3", "Fresh"],
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Protein Smoothie Bowl",
    image: "/protein-smoothie-bowl.png",
    cookTime: "10 min",
    servings: 1,
    calories: 320,
    protein: 28,
    tags: ["Quick", "Post-Workout"],
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Turkey Meatball Pasta",
    image: "/turkey-meatball-pasta.png",
    cookTime: "35 min",
    servings: 4,
    calories: 420,
    protein: 30,
    tags: ["Family", "Comfort"],
    difficulty: "Medium",
  },
  {
    id: 5,
    title: "Veggie Stir-Fry with Tofu",
    image: "/veggie-stir-fry-tofu.png",
    cookTime: "18 min",
    servings: 2,
    calories: 280,
    protein: 18,
    tags: ["Vegetarian", "Low Cal"],
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "Overnight Protein Oats",
    image: "/overnight-protein-oats.png",
    cookTime: "5 min",
    servings: 1,
    calories: 350,
    protein: 25,
    tags: ["Make Ahead", "Breakfast"],
    difficulty: "Easy",
  },
]

export function RecipeGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-sans font-medium">All Recipes ({recipes.length})</h3>
        <Button variant="outline" size="sm">
          Sort by: Popular
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Badge className="absolute bottom-2 left-2 text-xs">{recipe.difficulty}</Badge>
            </div>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-sans font-semibold text-sm leading-tight">{recipe.title}</h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {recipe.cookTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {recipe.servings} servings
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  {recipe.calories} kcal
                </div>
                <div className="font-medium">{recipe.protein}g protein</div>
              </div>

              <div className="flex flex-wrap gap-1">
                {recipe.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button size="sm" className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                View Recipe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
