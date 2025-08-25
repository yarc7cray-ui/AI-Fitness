import { RecipeDetail } from "@/components/nutrition/recipe-detail"
import { NutritionalInfo } from "@/components/nutrition/nutritional-info"
import { RecipeInstructions } from "@/components/nutrition/recipe-instructions"
import { SimilarRecipes } from "@/components/nutrition/similar-recipes"

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-6">
        <RecipeDetail recipeId={params.id} />
        <NutritionalInfo recipeId={params.id} />
        <RecipeInstructions recipeId={params.id} />
        <SimilarRecipes recipeId={params.id} />
      </main>
    </div>
  )
}
