import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

const filterCategories = [
  { label: "All", active: true },
  { label: "High Protein", active: false },
  { label: "Low Carb", active: false },
  { label: "Vegetarian", active: false },
  { label: "Quick (< 30min)", active: false },
  { label: "Low Calorie", active: false },
]

const activeFilters = ["High Protein", "Quick"]

export function RecipeFilters() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-sans font-medium">Filters</h3>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterCategories.map((filter, index) => (
          <Button key={index} variant={filter.active ? "default" : "outline"} size="sm" className="h-8">
            {filter.label}
          </Button>
        ))}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm text-muted-foreground">Active:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {filter}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
