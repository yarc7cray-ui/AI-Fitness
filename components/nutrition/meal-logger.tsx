"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus, 
  Search, 
  Utensils, 
  Coffee,
  Cookie,
  Droplets,
  X
} from "lucide-react"
import { 
  FoodDatabase, 
  NutritionTracker, 
  type FoodItem, 
  type DailyNutritionLog
} from "@/lib/user-store"

const mealTypes = [
  { value: 'breakfast', label: 'Breakfast', icon: Coffee },
  { value: 'lunch', label: 'Lunch', icon: Utensils },
  { value: 'dinner', label: 'Dinner', icon: Utensils },
  { value: 'snack', label: 'Snack', icon: Cookie }
] as const

const categoryColors = {
  protein: 'bg-red-100 text-red-700',
  carbs: 'bg-yellow-100 text-yellow-700',
  fats: 'bg-blue-100 text-blue-700',
  vegetables: 'bg-green-100 text-green-700',
  fruits: 'bg-purple-100 text-purple-700',
  dairy: 'bg-orange-100 text-orange-700',
  snacks: 'bg-pink-100 text-pink-700',
  beverages: 'bg-cyan-100 text-cyan-700'
}

interface MealLoggerProps {
  onFoodAdded?: () => void
}

export function MealLogger({ onFoodAdded }: MealLoggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast')
  const [servingSize, setServingSize] = useState("")
  const [customServing, setCustomServing] = useState("")
  const [todaysLog, setTodaysLog] = useState<DailyNutritionLog | null>(null)
  
  const searchResults = searchQuery.trim() 
    ? FoodDatabase.searchFoods(searchQuery).slice(0, 8) 
    : FoodDatabase.getAllFoods().slice(0, 8)

  useEffect(() => {
    const log = NutritionTracker.getTodaysLog()
    setTodaysLog(log)
  }, [])

  const handleAddFood = () => {
    if (!selectedFood || !servingSize) return

    const grams = servingSize === 'custom' 
      ? parseFloat(customServing) || 0
      : parseFloat(servingSize) || 0

    if (grams <= 0) return

    NutritionTracker.logFood(selectedFood.id, grams, selectedMealType)
    
    // Reset form
    setSelectedFood(null)
    setServingSize("")
    setCustomServing("")
    setSearchQuery("")
    setIsOpen(false)
    
    // Refresh today's log
    const updatedLog = NutritionTracker.getTodaysLog()
    setTodaysLog(updatedLog)
    
    onFoodAdded?.()
  }

  const removeFood = (foodId: string) => {
    if (!todaysLog) return
    NutritionTracker.removeFood(foodId, todaysLog.date)
    const updatedLog = NutritionTracker.getTodaysLog()
    setTodaysLog(updatedLog)
    onFoodAdded?.()
  }

  const addWater = () => {
    const today = new Date().toISOString().split('T')[0]
    NutritionTracker.updateWaterIntake(today, 250) // Add 250ml (1 glass)
    const updatedLog = NutritionTracker.getTodaysLog()
    setTodaysLog(updatedLog)
    onFoodAdded?.()
  }

  const getFoodsByMealType = (mealType: string) => {
    return todaysLog?.foods.filter(food => food.mealType === mealType) || []
  }

  return (
    <div className="space-y-6">
      {/* Quick Add Water */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-sans text-lg flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              Water Intake
            </CardTitle>
            <Button onClick={addWater} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Glass
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {Math.round((todaysLog?.waterIntake || 0) / 250)}
            </div>
            <div className="text-sm text-muted-foreground">glasses today</div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Sections */}
      {mealTypes.map((meal) => {
        const mealFoods = getFoodsByMealType(meal.value)
        const mealCalories = mealFoods.reduce((sum, food) => sum + food.calories, 0)
        
        return (
          <Card key={meal.value}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-sans text-lg flex items-center gap-2">
                  <meal.icon className="h-5 w-5 text-primary" />
                  {meal.label}
                  {mealCalories > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {mealCalories} cal
                    </Badge>
                  )}
                </CardTitle>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedMealType(meal.value)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Food
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add Food to {meal.label}</DialogTitle>
                      <DialogDescription>
                        Search for foods and add them to your meal log
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      {/* Food Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search for food..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      {/* Food Results */}
                      {!selectedFood && (
                        <div className="grid gap-2 max-h-64 overflow-y-auto">
                          {searchResults.map((food) => (
                            <div 
                              key={food.id}
                              onClick={() => setSelectedFood(food)}
                              className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="font-sans font-medium">{food.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {food.calories} cal per 100g
                                  </div>
                                </div>
                                <Badge className={categoryColors[food.category]}>
                                  {food.category}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Selected Food Details */}
                      {selectedFood && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex-1">
                              <div className="font-sans font-medium">{selectedFood.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {selectedFood.calories} cal, {selectedFood.macros.protein}g protein per 100g
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setSelectedFood(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Serving Size Selection */}
                          <div className="space-y-3">
                            <Label>Serving Size</Label>
                            <Select value={servingSize} onValueChange={setServingSize}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select serving size" />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedFood.commonServings.map((serving, index) => (
                                  <SelectItem key={index} value={serving.grams.toString()}>
                                    {serving.name} - {Math.round(selectedFood.calories * serving.grams / 100)} cal
                                  </SelectItem>
                                ))}
                                <SelectItem value="custom">Custom amount</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            {servingSize === 'custom' && (
                              <div className="flex gap-2 items-center">
                                <Input
                                  type="number"
                                  placeholder="Amount in grams"
                                  value={customServing}
                                  onChange={(e) => setCustomServing(e.target.value)}
                                />
                                <span className="text-sm text-muted-foreground">grams</span>
                              </div>
                            )}
                          </div>

                          {/* Nutrition Preview */}
                          {servingSize && (
                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                              <div className="text-sm font-medium mb-2">Nutrition for this serving:</div>
                              {(() => {
                                const grams = servingSize === 'custom' 
                                  ? parseFloat(customServing) || 0 
                                  : parseFloat(servingSize) || 0
                                const multiplier = grams / 100
                                return (
                                  <div className="grid grid-cols-4 gap-2 text-xs">
                                    <div>
                                      <div className="font-semibold">{Math.round(selectedFood.calories * multiplier)}</div>
                                      <div className="text-muted-foreground">calories</div>
                                    </div>
                                    <div>
                                      <div className="font-semibold">{Math.round(selectedFood.macros.protein * multiplier)}g</div>
                                      <div className="text-muted-foreground">protein</div>
                                    </div>
                                    <div>
                                      <div className="font-semibold">{Math.round(selectedFood.macros.carbs * multiplier)}g</div>
                                      <div className="text-muted-foreground">carbs</div>
                                    </div>
                                    <div>
                                      <div className="font-semibold">{Math.round(selectedFood.macros.fats * multiplier)}g</div>
                                      <div className="text-muted-foreground">fats</div>
                                    </div>
                                  </div>
                                )
                              })()}
                            </div>
                          )}

                          <Button 
                            onClick={handleAddFood} 
                            disabled={!servingSize || (servingSize === 'custom' && !customServing)}
                            className="w-full gradient-primary text-white"
                          >
                            Add to {meal.label}
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            
            {mealFoods.length > 0 && (
              <CardContent>
                <div className="space-y-2">
                  {mealFoods.map((food) => (
                    <div key={food.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <div className="font-sans text-sm font-medium">{food.foodName}</div>
                        <div className="text-xs text-muted-foreground">
                          {food.servingSize}g • {food.calories} cal
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFood(food.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
