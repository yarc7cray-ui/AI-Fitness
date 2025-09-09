import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Utensils } from "lucide-react"
import { NutritionDatabase } from "@/lib/nutrition-database"

interface RecipeDetailProps {
  recipeId: string
}

export function RecipeDetail({ recipeId }: RecipeDetailProps) {
  const recipe = NutritionDatabase.getRecipeById(recipeId)

  if (!recipe) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Recipe not found</CardTitle>
        </CardHeader>
        <CardContent>We couldn't find a recipe with that ID.</CardContent>
      </Card>
    )
  }

  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="h-full">
          <img
            src={recipe.imageUrl || "/placeholder.svg"}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <CardHeader>
            <div className="flex items-center gap-2 flex-wrap">
              {recipe.dietaryTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="font-sans text-xl">{recipe.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">{recipe.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> {totalTime} min total
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4" /> {recipe.difficulty}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" /> {recipe.servings} servings
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-sans font-medium">Ingredients</h3>
              <ul className="list-disc pl-5 text-sm">
                {recipe.ingredients.map((ing) => (
                  <li key={ing.foodId}>
                    {ing.food.name} 
                    <span className="text-muted-foreground"> — {ing.quantity}g</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
