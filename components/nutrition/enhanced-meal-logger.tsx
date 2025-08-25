"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { 
  Plus, 
  Search, 
  Heart,
  Clock,
  Trash2,
  Edit,
  Coffee,
  Utensils,
  Moon,
  Cookie,
  Droplets,
  Target,
  TrendingUp,
  Star
} from "lucide-react"
import { 
  nutritionTracker, 
  type MealEntry, 
  type DailyNutrition, 
  type MealType,
  type WaterEntry 
} from "@/lib/nutrition-tracking"
import { 
  NutritionDatabase, 
  type Food, 
  type Recipe, 
  FOODS,
  RECIPES 
} from "@/lib/nutrition-database"

export function EnhancedMealLogger() {
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition | null>(null)
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState<MealType>('breakfast')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Food[]>([])
  const [recentFoods, setRecentFoods] = useState<Food[]>([])
  const [favoriteFoods, setFavoriteFoods] = useState<Food[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [quantity, setQuantity] = useState<string>('100')
  const [selectedPortion, setSelectedPortion] = useState<string>('custom')
  const [waterAmount, setWaterAmount] = useState<string>('250')

  useEffect(() => {
    loadTodaysNutrition()
    loadUserData()
  }, [])

  const loadTodaysNutrition = () => {
    const nutrition = nutritionTracker.getTodaysNutrition()
    setDailyNutrition(nutrition)
  }

  const loadUserData = () => {
    setRecentFoods(nutritionTracker.getRecentFoods())
    setFavoriteFoods(nutritionTracker.getFavoriteFoods())
    setRecipes(RECIPES)
  }

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = NutritionDatabase.searchFoods(searchQuery)
      setSearchResults(results.slice(0, 10))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const getMealIcon = (mealType: MealType) => {
    switch (mealType) {
      case 'breakfast': return <Coffee className="h-4 w-4" />
      case 'lunch': return <Utensils className="h-4 w-4" />
      case 'dinner': return <Utensils className="h-4 w-4" />
      case 'snacks': return <Cookie className="h-4 w-4" />
    }
  }

  const getMealTime = (mealType: MealType) => {
    switch (mealType) {
      case 'breakfast': return '7:00 AM'
      case 'lunch': return '12:30 PM'
      case 'dinner': return '7:00 PM'
      case 'snacks': return 'Anytime'
    }
  }

  const handleAddFood = () => {
    if (!selectedFood) return

    const finalQuantity = selectedPortion === 'custom' 
      ? parseFloat(quantity) || 100
      : selectedFood.commonPortions?.find(p => p.name === selectedPortion)?.grams || 100

    const entry = nutritionTracker.addFoodToMeal(
      selectedFood.id,
      finalQuantity,
      selectedMealType
    )

    if (entry) {
      loadTodaysNutrition()
      setIsAddFoodOpen(false)
      setSelectedFood(null)
      setQuantity('100')
      setSelectedPortion('custom')
      setSearchQuery('')
    }
  }

  const handleRemoveFood = (entryId: string) => {
    if (nutritionTracker.removeMealEntry(entryId)) {
      loadTodaysNutrition()
    }
  }

  const handleAddWater = () => {
    const amount = parseFloat(waterAmount) || 250
    nutritionTracker.addWaterEntry(amount)
    loadTodaysNutrition()
    setWaterAmount('250')
  }

  const handleAddToFavorites = (food: Food) => {
    nutritionTracker.addToFavorites(food)
    loadUserData()
  }

  const calculateNutrition = (food: Food, qty: number) => {
    return NutritionDatabase.calculateNutrition(food.id, qty)
  }

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'bg-red-500'
    if (percentage < 80) return 'bg-yellow-500'
    if (percentage < 110) return 'bg-green-500'
    return 'bg-blue-500'
  }

  if (!dailyNutrition) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Loading nutrition data...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Daily Nutrition Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Today's Nutrition Progress
          </CardTitle>
          <CardDescription>
            Track your daily calories and macronutrients
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Calories */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Calories</Label>
                <span className="text-sm text-muted-foreground">
                  {dailyNutrition.totals.calories} / {dailyNutrition.goals.calories}
                </span>
              </div>
              <Progress 
                value={getProgressPercentage(dailyNutrition.totals.calories, dailyNutrition.goals.calories)}
                className="h-2"
              />
            </div>

            {/* Protein */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Protein</Label>
                <span className="text-sm text-muted-foreground">
                  {dailyNutrition.totals.protein}g / {dailyNutrition.goals.protein}g
                </span>
              </div>
              <Progress 
                value={getProgressPercentage(dailyNutrition.totals.protein, dailyNutrition.goals.protein)}
                className="h-2"
              />
            </div>

            {/* Carbs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Carbs</Label>
                <span className="text-sm text-muted-foreground">
                  {dailyNutrition.totals.carbs}g / {dailyNutrition.goals.carbs}g
                </span>
              </div>
              <Progress 
                value={getProgressPercentage(dailyNutrition.totals.carbs, dailyNutrition.goals.carbs)}
                className="h-2"
              />
            </div>

            {/* Fat */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Fat</Label>
                <span className="text-sm text-muted-foreground">
                  {dailyNutrition.totals.fat}g / {dailyNutrition.goals.fat}g
                </span>
              </div>
              <Progress 
                value={getProgressPercentage(dailyNutrition.totals.fat, dailyNutrition.goals.fat)}
                className="h-2"
              />
            </div>
          </div>

          {/* Water Intake */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Water Intake</p>
                <p className="text-sm text-muted-foreground">
                  {dailyNutrition.waterIntake}ml / {dailyNutrition.goals.water}ml
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={waterAmount}
                onChange={(e) => setWaterAmount(e.target.value)}
                placeholder="250"
                className="w-20 h-8"
              />
              <Button onClick={handleAddWater} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals */}
      <div className="grid gap-6 md:grid-cols-2">
        {(['breakfast', 'lunch', 'dinner', 'snacks'] as MealType[]).map((mealType) => (
          <Card key={mealType}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 capitalize">
                  {getMealIcon(mealType)}
                  {mealType}
                  <Badge variant="outline" className="text-xs">
                    {getMealTime(mealType)}
                  </Badge>
                </CardTitle>
                <Dialog open={isAddFoodOpen && selectedMealType === mealType} onOpenChange={(open) => {
                  setIsAddFoodOpen(open)
                  if (open) setSelectedMealType(mealType)
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedMealType(mealType)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Food
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add Food to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</DialogTitle>
                      <DialogDescription>
                        Search for foods or select from your recent items and favorites
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search foods..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <Tabs defaultValue="search" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="search">Search</TabsTrigger>
                          <TabsTrigger value="recent">Recent</TabsTrigger>
                          <TabsTrigger value="favorites">Favorites</TabsTrigger>
                          <TabsTrigger value="recipes">Recipes</TabsTrigger>
                        </TabsList>

                        <TabsContent value="search" className="space-y-4">
                          {searchResults.length > 0 ? (
                            <div className="grid gap-2">
                              {searchResults.map((food) => (
                                <div
                                  key={food.id}
                                  className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                                    selectedFood?.id === food.id ? 'border-primary bg-primary/5' : ''
                                  }`}
                                  onClick={() => setSelectedFood(food)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium">{food.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {food.calories} cal per {food.servingSize}{food.servingUnit}
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleAddToFavorites(food)
                                      }}
                                    >
                                      <Heart className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : searchQuery ? (
                            <p className="text-center text-muted-foreground py-8">
                              No foods found for "{searchQuery}"
                            </p>
                          ) : (
                            <p className="text-center text-muted-foreground py-8">
                              Start typing to search for foods
                            </p>
                          )}
                        </TabsContent>

                        <TabsContent value="recent" className="space-y-4">
                          {recentFoods.length > 0 ? (
                            <div className="grid gap-2">
                              {recentFoods.map((food) => (
                                <div
                                  key={food.id}
                                  className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                                    selectedFood?.id === food.id ? 'border-primary bg-primary/5' : ''
                                  }`}
                                  onClick={() => setSelectedFood(food)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium">{food.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {food.calories} cal per {food.servingSize}{food.servingUnit}
                                      </p>
                                    </div>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted-foreground py-8">
                              No recent foods yet
                            </p>
                          )}
                        </TabsContent>

                        <TabsContent value="favorites" className="space-y-4">
                          {favoriteFoods.length > 0 ? (
                            <div className="grid gap-2">
                              {favoriteFoods.map((food) => (
                                <div
                                  key={food.id}
                                  className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                                    selectedFood?.id === food.id ? 'border-primary bg-primary/5' : ''
                                  }`}
                                  onClick={() => setSelectedFood(food)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium">{food.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {food.calories} cal per {food.servingSize}{food.servingUnit}
                                      </p>
                                    </div>
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted-foreground py-8">
                              No favorite foods yet
                            </p>
                          )}
                        </TabsContent>

                        <TabsContent value="recipes" className="space-y-4">
                          <div className="grid gap-2">
                            {recipes.map((recipe) => (
                              <div key={recipe.id} className="p-3 border rounded-lg">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium">{recipe.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {recipe.nutrition.calories} cal per serving • {recipe.servings} servings
                                    </p>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    Add Recipe
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>

                      {/* Selected Food Details */}
                      {selectedFood && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">{selectedFood.name}</CardTitle>
                            <CardDescription>
                              {selectedFood.brand && `${selectedFood.brand} • `}
                              {selectedFood.category}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Portion Selection */}
                            <div className="space-y-2">
                              <Label>Portion Size</Label>
                              <div className="grid gap-2">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="custom"
                                    name="portion"
                                    value="custom"
                                    checked={selectedPortion === 'custom'}
                                    onChange={(e) => setSelectedPortion(e.target.value)}
                                  />
                                  <label htmlFor="custom" className="flex items-center gap-2">
                                    Custom:
                                    <Input
                                      type="number"
                                      value={quantity}
                                      onChange={(e) => setQuantity(e.target.value)}
                                      className="w-20 h-8"
                                    />
                                    <span className="text-sm">grams</span>
                                  </label>
                                </div>
                                {selectedFood.commonPortions?.map((portion) => (
                                  <div key={portion.name} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id={portion.name}
                                      name="portion"
                                      value={portion.name}
                                      checked={selectedPortion === portion.name}
                                      onChange={(e) => setSelectedPortion(e.target.value)}
                                    />
                                    <label htmlFor={portion.name} className="text-sm">
                                      {portion.name} ({portion.grams}g)
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Nutrition Preview */}
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <h4 className="font-medium mb-2">Nutrition (for selected portion)</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {(() => {
                                  const qty = selectedPortion === 'custom' 
                                    ? parseFloat(quantity) || 100
                                    : selectedFood.commonPortions?.find(p => p.name === selectedPortion)?.grams || 100
                                  const nutrition = calculateNutrition(selectedFood, qty)
                                  return (
                                    <>
                                      <div>Calories: {nutrition.calories}</div>
                                      <div>Protein: {nutrition.protein}g</div>
                                      <div>Carbs: {nutrition.carbs}g</div>
                                      <div>Fat: {nutrition.fat}g</div>
                                    </>
                                  )
                                })()}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button onClick={handleAddFood} className="flex-1">
                                Add to {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => handleAddToFavorites(selectedFood)}
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {dailyNutrition.meals[mealType].length > 0 ? (
                <>
                  {dailyNutrition.meals[mealType].map((entry) => {
                    const nutrition = calculateNutrition(entry.food, entry.quantity)
                    return (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{entry.food.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {entry.quantity}g • {nutrition.calories} cal
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFood(entry.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                  <div className="pt-2 border-t">
                    {(() => {
                      const mealTotals = NutritionDatabase.calculateDailyTotals(dailyNutrition.meals[mealType])
                      return (
                        <div className="text-sm text-muted-foreground">
                          Total: {mealTotals.calories} cal • {mealTotals.protein}g protein • {mealTotals.carbs}g carbs • {mealTotals.fat}g fat
                        </div>
                      )
                    })()}
                  </div>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  No foods logged for {mealType} yet
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
