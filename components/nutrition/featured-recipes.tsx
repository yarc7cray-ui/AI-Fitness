import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Flame, Star } from "lucide-react"

const featuredRecipes = [
  {
    id: 1,
    title: "High-Protein Breakfast Bowl",
    image: "/protein-breakfast-bowl.png",
    cookTime: "15 min",
    servings: 2,
    calories: 420,
    rating: 4.8,
    tags: ["High Protein", "Quick", "Healthy"],
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Salad",
    image: "/mediterranean-quinoa-salad.png",
    cookTime: "20 min",
    servings: 4,
    calories: 350,
    rating: 4.9,
    tags: ["Vegetarian", "Fresh", "Low Cal"],
  },
]

export function FeaturedRecipes() {
  return (
    <div className="space-y-4">
      <h2 className="font-sans text-lg font-semibold">Featured Recipes</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {featuredRecipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <div className="relative">
              <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                {recipe.rating}
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-sans font-semibold">{recipe.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {recipe.cookTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {recipe.servings} servings
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  {recipe.calories} kcal
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {recipe.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
