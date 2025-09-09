import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListOrdered } from "lucide-react"
import { NutritionDatabase } from "@/lib/nutrition-database"

interface RecipeInstructionsProps {
  recipeId: string
}

export function RecipeInstructions({ recipeId }: RecipeInstructionsProps) {
  const recipe = NutritionDatabase.getRecipeById(recipeId)

  if (!recipe) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-sans">
          <ListOrdered className="h-5 w-5 text-primary" /> Instructions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          {recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
