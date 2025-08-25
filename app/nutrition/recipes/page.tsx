import { RecipeHeader } from "@/components/nutrition/recipe-header"
import { RecipeFilters } from "@/components/nutrition/recipe-filters"
import { RecipeGrid } from "@/components/nutrition/recipe-grid"
import { FeaturedRecipes } from "@/components/nutrition/featured-recipes"

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-background">
      <RecipeHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <FeaturedRecipes />
        <RecipeFilters />
        <RecipeGrid />
      </main>
    </div>
  )
}
