import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"
import { NutritionDatabase } from "@/lib/nutrition-database"

interface NutritionalInfoProps {
  recipeId: string
}

export function NutritionalInfo({ recipeId }: NutritionalInfoProps) {
  const recipe = NutritionDatabase.getRecipeById(recipeId)

  if (!recipe) return null

  const info = recipe.nutrition

  const items = [
    { label: "Calories", value: `${info.calories} kcal` },
    { label: "Protein", value: `${info.protein} g` },
    { label: "Carbs", value: `${info.carbs} g` },
    { label: "Fat", value: `${info.fat} g` },
    { label: "Fiber", value: `${info.fiber} g` },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-sans">
          <Flame className="h-5 w-5 text-primary" /> Nutritional Information (per serving)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          {items.map((it) => (
            <div key={it.label} className="p-3 rounded-md bg-muted/50 text-center">
              <div className="text-muted-foreground text-xs">{it.label}</div>
              <div className="font-semibold">{it.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
