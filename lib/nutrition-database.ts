export interface Food {
  id: string
  name: string
  brand?: string
  category: FoodCategory
  servingSize: number // grams
  servingUnit: string // "g", "ml", "pieces", "cups", etc.
  calories: number // per serving
  macros: {
    protein: number // grams
    carbs: number // grams
    fat: number // grams
    fiber?: number // grams
    sugar?: number // grams
  }
  micronutrients?: {
    sodium?: number // mg
    potassium?: number // mg
    calcium?: number // mg
    iron?: number // mg
    vitaminC?: number // mg
    vitaminA?: number // IU
  }
  barcode?: string
  imageUrl?: string
  verified: boolean
  commonPortions?: {
    name: string
    grams: number
  }[]
}

export type FoodCategory = 
  | 'proteins' | 'grains' | 'vegetables' | 'fruits' | 'dairy' 
  | 'nuts-seeds' | 'oils-fats' | 'beverages' | 'snacks' | 'condiments'
  | 'fast-food' | 'prepared-meals' | 'supplements'

export interface MealEntry {
  id: string
  foodId: string
  food: Food
  quantity: number // in grams
  mealType: MealType
  loggedAt: Date
  notes?: string
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks'

export interface DailyNutrition {
  date: Date
  meals: {
    breakfast: MealEntry[]
    lunch: MealEntry[]
    dinner: MealEntry[]
    snacks: MealEntry[]
  }
  totals: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
  }
  waterIntake: number // ml
  goals: NutritionGoals
}

export interface NutritionGoals {
  calories: number
  protein: number // grams
  carbs: number // grams  
  fat: number // grams
  fiber: number // grams
  water: number // ml
}

export interface Recipe {
  id: string
  name: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  prepTime: number // minutes
  cookTime: number // minutes
  servings: number
  category: string[]
  dietaryTags: string[] // "vegetarian", "vegan", "gluten-free", etc.
  ingredients: {
    foodId: string
    food: Food
    quantity: number // grams
    notes?: string
  }[]
  instructions: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  imageUrl?: string
}

// Comprehensive Food Database
export const FOODS: Food[] = [
  // PROTEINS
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    category: 'proteins',
    servingSize: 100,
    servingUnit: 'g',
    calories: 165,
    macros: {
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0
    },
    micronutrients: {
      sodium: 74,
      potassium: 256,
      iron: 0.7
    },
    verified: true,
    commonPortions: [
      { name: 'Small breast (85g)', grams: 85 },
      { name: 'Medium breast (120g)', grams: 120 },
      { name: 'Large breast (150g)', grams: 150 }
    ]
  },
  {
    id: 'salmon-fillet',
    name: 'Salmon Fillet',
    category: 'proteins',
    servingSize: 100,
    servingUnit: 'g',
    calories: 208,
    macros: {
      protein: 20,
      carbs: 0,
      fat: 13,
      fiber: 0
    },
    micronutrients: {
      sodium: 47,
      potassium: 363
    },
    verified: true,
    commonPortions: [
      { name: 'Small fillet (100g)', grams: 100 },
      { name: 'Medium fillet (150g)', grams: 150 },
      { name: 'Large fillet (200g)', grams: 200 }
    ]
  },
  {
    id: 'eggs-large',
    name: 'Large Eggs',
    category: 'proteins',
    servingSize: 50,
    servingUnit: 'g (1 egg)',
    calories: 70,
    macros: {
      protein: 6,
      carbs: 0.4,
      fat: 5,
      fiber: 0
    },
    micronutrients: {
      sodium: 124,
      iron: 0.9
    },
    verified: true,
    commonPortions: [
      { name: '1 egg', grams: 50 },
      { name: '2 eggs', grams: 100 },
      { name: '3 eggs', grams: 150 }
    ]
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt (Plain)',
    category: 'dairy',
    servingSize: 100,
    servingUnit: 'g',
    calories: 59,
    macros: {
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      fiber: 0,
      sugar: 3.6
    },
    micronutrients: {
      calcium: 110,
      sodium: 36
    },
    verified: true,
    commonPortions: [
      { name: 'Small container (150g)', grams: 150 },
      { name: 'Large container (200g)', grams: 200 },
      { name: '1 cup (245g)', grams: 245 }
    ]
  },

  // GRAINS & CARBS
  {
    id: 'brown-rice',
    name: 'Brown Rice (Cooked)',
    category: 'grains',
    servingSize: 100,
    servingUnit: 'g',
    calories: 111,
    macros: {
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      fiber: 1.8
    },
    micronutrients: {
      potassium: 43
    },
    verified: true,
    commonPortions: [
      { name: '1/2 cup cooked (100g)', grams: 100 },
      { name: '1 cup cooked (195g)', grams: 195 }
    ]
  },
  {
    id: 'oats-rolled',
    name: 'Rolled Oats (Dry)',
    category: 'grains',
    servingSize: 40,
    servingUnit: 'g',
    calories: 150,
    macros: {
      protein: 5,
      carbs: 27,
      fat: 3,
      fiber: 4,
      sugar: 1
    },
    micronutrients: {
      iron: 2.1,
      calcium: 20
    },
    verified: true,
    commonPortions: [
      { name: '1/3 cup dry (30g)', grams: 30 },
      { name: '1/2 cup dry (40g)', grams: 40 },
      { name: '3/4 cup dry (60g)', grams: 60 }
    ]
  },
  {
    id: 'quinoa-cooked',
    name: 'Quinoa (Cooked)',
    category: 'grains',
    servingSize: 100,
    servingUnit: 'g',
    calories: 120,
    macros: {
      protein: 4.4,
      carbs: 22,
      fat: 1.9,
      fiber: 2.8
    },
    micronutrients: {
      potassium: 172,
      iron: 1.5
    },
    verified: true,
    commonPortions: [
      { name: '1/2 cup cooked (90g)', grams: 90 },
      { name: '1 cup cooked (185g)', grams: 185 }
    ]
  },

  // VEGETABLES
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'vegetables',
    servingSize: 100,
    servingUnit: 'g',
    calories: 25,
    macros: {
      protein: 3,
      carbs: 5,
      fat: 0.4,
      fiber: 2.6,
      sugar: 1.5
    },
    micronutrients: {
      vitaminC: 89,
      calcium: 47,
      iron: 0.7
    },
    verified: true,
    commonPortions: [
      { name: '1 cup chopped (90g)', grams: 90 },
      { name: '1 medium head (150g)', grams: 150 }
    ]
  },
  {
    id: 'spinach',
    name: 'Spinach (Fresh)',
    category: 'vegetables',
    servingSize: 100,
    servingUnit: 'g',
    calories: 23,
    macros: {
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      sugar: 0.4
    },
    micronutrients: {
      vitaminA: 469,
      vitaminC: 28,
      iron: 2.7,
      calcium: 99
    },
    verified: true,
    commonPortions: [
      { name: '1 cup (30g)', grams: 30 },
      { name: '1 bunch (340g)', grams: 340 }
    ]
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato (Baked)',
    category: 'vegetables',
    servingSize: 100,
    servingUnit: 'g',
    calories: 90,
    macros: {
      protein: 2,
      carbs: 21,
      fat: 0.2,
      fiber: 3.3,
      sugar: 6.8
    },
    micronutrients: {
      vitaminA: 19218,
      potassium: 475
    },
    verified: true,
    commonPortions: [
      { name: 'Small potato (60g)', grams: 60 },
      { name: 'Medium potato (100g)', grams: 100 },
      { name: 'Large potato (180g)', grams: 180 }
    ]
  },

  // FRUITS
  {
    id: 'banana',
    name: 'Banana',
    category: 'fruits',
    servingSize: 100,
    servingUnit: 'g',
    calories: 89,
    macros: {
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      fiber: 2.6,
      sugar: 12
    },
    micronutrients: {
      potassium: 358,
      vitaminC: 8.7
    },
    verified: true,
    commonPortions: [
      { name: 'Small banana (80g)', grams: 80 },
      { name: 'Medium banana (118g)', grams: 118 },
      { name: 'Large banana (150g)', grams: 150 }
    ]
  },
  {
    id: 'apple',
    name: 'Apple (with skin)',
    category: 'fruits',
    servingSize: 100,
    servingUnit: 'g',
    calories: 52,
    macros: {
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      fiber: 2.4,
      sugar: 10
    },
    micronutrients: {
      potassium: 107,
      vitaminC: 4.6
    },
    verified: true,
    commonPortions: [
      { name: 'Small apple (150g)', grams: 150 },
      { name: 'Medium apple (180g)', grams: 180 },
      { name: 'Large apple (200g)', grams: 200 }
    ]
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    category: 'fruits',
    servingSize: 100,
    servingUnit: 'g',
    calories: 57,
    macros: {
      protein: 0.7,
      carbs: 14,
      fat: 0.3,
      fiber: 2.4,
      sugar: 10
    },
    micronutrients: {
      vitaminC: 9.7,
      potassium: 77
    },
    verified: true,
    commonPortions: [
      { name: '1/2 cup (75g)', grams: 75 },
      { name: '1 cup (150g)', grams: 150 }
    ]
  },

  // NUTS & SEEDS
  {
    id: 'almonds',
    name: 'Almonds',
    category: 'nuts-seeds',
    servingSize: 30,
    servingUnit: 'g',
    calories: 174,
    macros: {
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 4
    },
    micronutrients: {
      calcium: 76,
      iron: 1.1
    },
    verified: true,
    commonPortions: [
      { name: '23 almonds (30g)', grams: 30 },
      { name: '1/4 cup (35g)', grams: 35 }
    ]
  },

  // BEVERAGES
  {
    id: 'whole-milk',
    name: 'Whole Milk',
    category: 'beverages',
    servingSize: 240,
    servingUnit: 'ml',
    calories: 146,
    macros: {
      protein: 8,
      carbs: 11,
      fat: 8,
      fiber: 0,
      sugar: 11
    },
    micronutrients: {
      calcium: 276,
      potassium: 322
    },
    verified: true,
    commonPortions: [
      { name: '1 cup (240ml)', grams: 240 },
      { name: '1/2 cup (120ml)', grams: 120 }
    ]
  },
  {
    id: 'water',
    name: 'Water',
    category: 'beverages',
    servingSize: 240,
    servingUnit: 'ml',
    calories: 0,
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0
    },
    verified: true,
    commonPortions: [
      { name: '1 cup (240ml)', grams: 240 },
      { name: '1 bottle (500ml)', grams: 500 }
    ]
  },

  // OILS & FATS
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    category: 'oils-fats',
    servingSize: 15,
    servingUnit: 'ml',
    calories: 120,
    macros: {
      protein: 0,
      carbs: 0,
      fat: 14,
      fiber: 0
    },
    verified: true,
    commonPortions: [
      { name: '1 tablespoon (15ml)', grams: 15 },
      { name: '1 teaspoon (5ml)', grams: 5 }
    ]
  }
]

// Recipe Database
export const RECIPES: Recipe[] = [
  {
    id: 'protein-smoothie',
    name: 'Protein Power Smoothie',
    description: 'High-protein breakfast smoothie perfect for post-workout recovery',
    difficulty: 'easy',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    category: ['breakfast', 'smoothies'],
    dietaryTags: ['high-protein', 'gluten-free'],
    ingredients: [
      { foodId: 'greek-yogurt', food: FOODS.find(f => f.id === 'greek-yogurt')!, quantity: 150 },
      { foodId: 'banana', food: FOODS.find(f => f.id === 'banana')!, quantity: 118 },
      { foodId: 'blueberries', food: FOODS.find(f => f.id === 'blueberries')!, quantity: 75 },
      { foodId: 'almonds', food: FOODS.find(f => f.id === 'almonds')!, quantity: 15 }
    ],
    instructions: [
      'Add Greek yogurt to blender',
      'Add banana and blueberries',
      'Add almonds and 1/2 cup water',
      'Blend until smooth',
      'Add ice if desired consistency is thicker'
    ],
    nutrition: {
      calories: 320,
      protein: 20,
      carbs: 45,
      fat: 8,
      fiber: 8
    }
  },
  {
    id: 'chicken-sweet-potato-bowl',
    name: 'Chicken & Sweet Potato Power Bowl',
    description: 'Balanced meal with lean protein and complex carbs',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    category: ['lunch', 'dinner', 'meal-prep'],
    dietaryTags: ['high-protein', 'gluten-free', 'dairy-free'],
    ingredients: [
      { foodId: 'chicken-breast', food: FOODS.find(f => f.id === 'chicken-breast')!, quantity: 240 },
      { foodId: 'sweet-potato', food: FOODS.find(f => f.id === 'sweet-potato')!, quantity: 200 },
      { foodId: 'broccoli', food: FOODS.find(f => f.id === 'broccoli')!, quantity: 150 },
      { foodId: 'olive-oil', food: FOODS.find(f => f.id === 'olive-oil')!, quantity: 15 }
    ],
    instructions: [
      'Preheat oven to 400°F',
      'Cut sweet potato into cubes and toss with half the olive oil',
      'Roast sweet potato for 20 minutes',
      'Season chicken breast and cook in remaining oil for 6-7 minutes per side',
      'Steam broccoli for 4-5 minutes',
      'Slice chicken and serve over sweet potato with broccoli'
    ],
    nutrition: {
      calories: 485,
      protein: 38,
      carbs: 42,
      fat: 12,
      fiber: 8
    }
  }
]

// Helper class for nutrition calculations and food management
export class NutritionDatabase {
  static getFoodById(id: string): Food | undefined {
    return FOODS.find(food => food.id === id)
  }

  static getFoodsByCategory(category: FoodCategory): Food[] {
    return FOODS.filter(food => food.category === category)
  }

  static searchFoods(query: string): Food[] {
    const lowercaseQuery = query.toLowerCase()
    return FOODS.filter(food =>
      food.name.toLowerCase().includes(lowercaseQuery) ||
      food.brand?.toLowerCase().includes(lowercaseQuery) ||
      food.category.toLowerCase().includes(lowercaseQuery)
    )
  }

  static getRecipeById(id: string): Recipe | undefined {
    return RECIPES.find(recipe => recipe.id === id)
  }

  static searchRecipes(query: string): Recipe[] {
    const lowercaseQuery = query.toLowerCase()
    return RECIPES.filter(recipe =>
      recipe.name.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.category.some(cat => cat.toLowerCase().includes(lowercaseQuery)) ||
      recipe.dietaryTags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  static calculateNutrition(foodId: string, quantity: number): {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
  } {
    const food = this.getFoodById(foodId)
    if (!food) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
    }

    const multiplier = quantity / food.servingSize
    
    return {
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.macros.protein * multiplier * 10) / 10,
      carbs: Math.round(food.macros.carbs * multiplier * 10) / 10,
      fat: Math.round(food.macros.fat * multiplier * 10) / 10,
      fiber: Math.round((food.macros.fiber || 0) * multiplier * 10) / 10,
      sugar: Math.round((food.macros.sugar || 0) * multiplier * 10) / 10
    }
  }

  static calculateDailyTotals(meals: MealEntry[]): {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
  } {
    return meals.reduce((totals, meal) => {
      const nutrition = this.calculateNutrition(meal.foodId, meal.quantity)
      return {
        calories: totals.calories + nutrition.calories,
        protein: totals.protein + nutrition.protein,
        carbs: totals.carbs + nutrition.carbs,
        fat: totals.fat + nutrition.fat,
        fiber: totals.fiber + nutrition.fiber,
        sugar: totals.sugar + nutrition.sugar
      }
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 })
  }

  static generateNutritionGoals(
    age: number, 
    gender: 'male' | 'female', 
    weight: number, // kg
    height: number, // cm
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active',
    goal: 'weight-loss' | 'maintenance' | 'muscle-gain'
  ): NutritionGoals {
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Calculate TDEE based on activity level
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9
    }
    
    const tdee = bmr * activityMultipliers[activityLevel]

    // Adjust calories based on goal
    let targetCalories: number
    switch (goal) {
      case 'weight-loss':
        targetCalories = tdee - 500 // 500 calorie deficit
        break
      case 'muscle-gain':
        targetCalories = tdee + 300 // 300 calorie surplus
        break
      default:
        targetCalories = tdee
    }

    // Calculate macro targets (using common ratios)
    const proteinCalories = targetCalories * 0.25 // 25% from protein
    const fatCalories = targetCalories * 0.30 // 30% from fat
    const carbCalories = targetCalories * 0.45 // 45% from carbs

    return {
      calories: Math.round(targetCalories),
      protein: Math.round(proteinCalories / 4), // 4 calories per gram of protein
      carbs: Math.round(carbCalories / 4), // 4 calories per gram of carbs
      fat: Math.round(fatCalories / 9), // 9 calories per gram of fat
      fiber: Math.round(targetCalories / 1000 * 14), // 14g per 1000 calories
      water: weight * 35 // 35ml per kg of body weight
    }
  }
}
