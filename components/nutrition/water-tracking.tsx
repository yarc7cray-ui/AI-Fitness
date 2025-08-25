import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Droplets, Plus, Minus } from "lucide-react"

export function WaterTracking() {
  const currentGlasses = 6
  const targetGlasses = 8
  const progress = (currentGlasses / targetGlasses) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          Water Intake
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-sans text-3xl font-bold text-blue-500">{currentGlasses}</span>
            <span className="font-serif text-sm text-muted-foreground">/ {targetGlasses} glasses</span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="font-serif text-xs text-muted-foreground">{targetGlasses - currentGlasses} glasses to go</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="sm">
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: targetGlasses }).map((_, index) => (
              <div
                key={index}
                className={`w-6 h-8 rounded-full border-2 ${
                  index < currentGlasses ? "bg-blue-500 border-blue-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Glass
        </Button>
      </CardContent>
    </Card>
  )
}
