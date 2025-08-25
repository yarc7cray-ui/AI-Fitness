import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Search, ScanLine, Plus } from "lucide-react"

const quickFoods = [
  { name: "Banana", calories: 105, icon: "🍌" },
  { name: "Apple", calories: 95, icon: "🍎" },
  { name: "Chicken Breast", calories: 165, icon: "🍗" },
  { name: "Greek Yogurt", calories: 130, icon: "🥛" },
]

export function QuickLogMeal() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Quick Log Meal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search food or enter manually..." className="pl-10" />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Camera className="h-4 w-4 mr-2" />
            Photo
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <ScanLine className="h-4 w-4 mr-2" />
            Barcode
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-serif text-sm font-medium text-muted-foreground">Quick Add</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickFoods.map((food, index) => (
              <Button key={index} variant="ghost" size="sm" className="justify-start h-auto p-2">
                <div className="flex items-center gap-2 w-full">
                  <span className="text-lg">{food.icon}</span>
                  <div className="text-left">
                    <div className="font-sans text-xs font-medium">{food.name}</div>
                    <div className="font-serif text-xs text-muted-foreground">{food.calories} kcal</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
