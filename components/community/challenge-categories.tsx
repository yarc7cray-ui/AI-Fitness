import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { id: "all", label: "All" },
  { id: "strength", label: "Strength" },
  { id: "cardio", label: "Cardio" },
  { id: "mobility", label: "Mobility" },
  { id: "nutrition", label: "Nutrition" },
  { id: "wellness", label: "Wellness" },
  { id: "habits", label: "Habits" },
]

export function ChallengeCategories() {
  return (
    <div className="space-y-3">
      <h2 className="font-sans text-lg font-semibold">Browse by Category</h2>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge key={cat.id} variant={cat.id === "all" ? "default" : "secondary"}>
                {cat.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
