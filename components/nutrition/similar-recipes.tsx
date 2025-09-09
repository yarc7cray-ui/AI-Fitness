import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NutritionDatabase, RECIPES } from "@/lib/nutrition-database"

interface SimilarRecipesProps {
  recipeId: string
}

function getSimilarRecipes(id: string) {
  const recipe = NutritionDatabase.getRecipeById(id)
  if (!recipe) return []

  const baseCats = new Set(recipe.category.map((c) => c.toLowerCase()))
  const baseTags = new Set(recipe.dietaryTags.map((t) => t.toLowerCase()))

  const scored = RECIPES.filter((r) => r.id !== id).map((r) => {
    const catScore = r.category.filter((c) => baseCats.has(c.toLowerCase())).length
    const tagScore = r.dietaryTags.filter((t) => baseTags.has(t.toLowerCase())).length
    return { r, score: catScore * 2 + tagScore }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored.map((s) => s.r).slice(0, 3)
}

export function SimilarRecipes({ recipeId }: SimilarRecipesProps) {
  const sims = getSimilarRecipes(recipeId)
  if (sims.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">You might also like</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {sims.map((rec) => (
            <Link key={rec.id} href={`/nutrition/recipes/${rec.id}`}>
              <div className="rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
                <img
                  src={rec.imageUrl || "/placeholder.svg"}
                  alt={rec.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3 space-y-2">
                  <h4 className="font-sans text-sm font-semibold leading-tight">{rec.name}</h4>
                  <div className="flex flex-wrap gap-1">
                    {rec.dietaryTags.slice(0, 2).map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
