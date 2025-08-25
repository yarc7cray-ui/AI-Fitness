"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Dumbbell,
  Apple,
  Target,
  Zap,
  Heart,
  Award,
  Activity
} from "lucide-react"
import { workoutTracker } from "@/lib/workout-tracking"
import { nutritionTracker } from "@/lib/nutrition-tracking"
import { ExerciseDatabase } from "@/lib/exercise-database"

export function EnhancedProgressCharts() {
  const [workoutStats, setWorkoutStats] = useState<any>(null)
  const [nutritionStats, setNutritionStats] = useState<any>(null)
  const [weightProgress, setWeightProgress] = useState<any[]>([])
  const [exerciseProgress, setExerciseProgress] = useState<any[]>([])
  const [nutritionProgress, setNutritionProgress] = useState<any[]>([])
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    loadProgressData()
  }, [timeframe])

  const loadProgressData = () => {
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90

    // Load workout stats
    const workoutData = workoutTracker.getWorkoutStats(days)
    setWorkoutStats(workoutData)

    // Load nutrition stats
    const nutritionData = nutritionTracker.getNutritionStats(days)
    setNutritionStats(nutritionData)

    // Load workout history for charts
    const workoutHistory = workoutTracker.getWorkoutHistory()
    const recentWorkouts = workoutHistory
      .filter(w => {
        const workoutDate = new Date(w.startTime)
        const cutoff = new Date()
        cutoff.setDate(cutoff.getDate() - days)
        return workoutDate >= cutoff && w.completed
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

    // Prepare workout progress data
    const workoutProgressData = recentWorkouts.map(workout => ({
      date: new Date(workout.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      duration: workout.totalDuration || 0,
      calories: workout.totalCalories || 0,
      exercises: workout.exercises.length
    }))
    setExerciseProgress(workoutProgressData)

    // Load nutrition progress
    const nutritionProgressData = nutritionTracker.getNutritionProgress()
    const recentNutrition = nutritionProgressData
      .filter(n => {
        const nutritionDate = new Date(n.date)
        const cutoff = new Date()
        cutoff.setDate(cutoff.getDate() - days)
        return nutritionDate >= cutoff
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(n => ({
        date: new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        calories: n.calories,
        protein: n.protein,
        carbs: n.carbs,
        fat: n.fat,
        water: n.water,
        goalMet: n.goalMetPercentage
      }))
    setNutritionProgress(recentNutrition)

    // Generate mock weight progress data
    generateWeightProgress(days)
  }

  const generateWeightProgress = (days: number) => {
    const data = []
    const startWeight = 75 // kg
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      // Simulate gradual weight change with some randomness
      const trend = -0.1 // losing weight slowly
      const randomVariation = (Math.random() - 0.5) * 0.5
      const weight = startWeight + (trend * (days - i)) + randomVariation
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: parseFloat(weight.toFixed(1)),
        trend: startWeight + (trend * (days - i))
      })
    }
    setWeightProgress(data)
  }

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1']

  if (!workoutStats || !nutritionStats) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Loading progress data...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Time Frame Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Progress Analytics</h2>
          <p className="text-muted-foreground">Track your fitness and nutrition progress over time</p>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(period)}
            >
              {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Workouts</p>
                <p className="text-2xl font-bold">{workoutStats.totalWorkouts}</p>
              </div>
              <Dumbbell className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+12% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Calories/Day</p>
                <p className="text-2xl font-bold">{nutritionStats.averageCalories}</p>
              </div>
              <Apple className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <Target className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-500">{nutritionStats.goalComplianceRate}% goal compliance</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Exercise Time</p>
                <p className="text-2xl font-bold">{workoutStats.totalMinutes}min</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
            <div className="flex items-center mt-2">
              <Calendar className="h-4 w-4 text-orange-500 mr-1" />
              <span className="text-sm text-orange-500">{Math.round(workoutStats.averageWorkoutLength)}min avg</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Water Intake</p>
                <p className="text-2xl font-bold">{Math.round(nutritionStats.averageWater / 1000 * 10) / 10}L</p>
              </div>
              <Heart className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-500">Daily average</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="fitness" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fitness">Fitness Progress</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition Trends</TabsTrigger>
          <TabsTrigger value="body">Body Composition</TabsTrigger>
        </TabsList>

        <TabsContent value="fitness" className="space-y-6">
          {/* Workout Frequency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Workout Frequency & Duration
              </CardTitle>
              <CardDescription>
                Track your workout consistency and exercise duration over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={exerciseProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="duration" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.3}
                    name="Duration (min)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Exercise Breakdown */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Frequent Exercises</CardTitle>
                <CardDescription>Your top exercises this period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workoutStats.mostFrequentExercises.map((exercise: any, index: number) => {
                    const exerciseData = ExerciseDatabase.getExerciseById(exercise.exerciseId)
                    return (
                      <div key={exercise.exerciseId} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{exerciseData?.name || exercise.exerciseId}</span>
                        </div>
                        <Badge variant="secondary">{exercise.count} times</Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workout Distribution</CardTitle>
                <CardDescription>Types of workouts completed</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Strength', value: 45 },
                        { name: 'Cardio', value: 30 },
                        { name: 'HIIT', value: 15 },
                        { name: 'Flexibility', value: 10 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-6">
          {/* Calorie Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5" />
                Daily Calorie Intake
              </CardTitle>
              <CardDescription>
                Track your daily calories against your goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={nutritionProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <ReferenceLine y={2000} stroke="red" strokeDasharray="5 5" label="Goal" />
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ fill: '#8884d8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Macronutrient Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Macronutrient Trends</CardTitle>
              <CardDescription>
                Track your protein, carbs, and fat intake over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={nutritionProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="protein" 
                    stackId="1"
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    name="Protein (g)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="carbs" 
                    stackId="1"
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    name="Carbs (g)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="fat" 
                    stackId="1"
                    stroke="#ffc658" 
                    fill="#ffc658" 
                    name="Fat (g)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Foods */}
          <Card>
            <CardHeader>
              <CardTitle>Most Consumed Foods</CardTitle>
              <CardDescription>Your frequently logged foods this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nutritionStats.topFoods.map((item: any, index: number) => (
                  <div key={item.food.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{item.food.name}</span>
                    </div>
                    <Badge variant="secondary">{item.frequency} times</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="body" className="space-y-6">
          {/* Weight Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Weight Progress
              </CardTitle>
              <CardDescription>
                Track your weight changes over time with trend analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ fill: '#8884d8' }}
                    name="Weight (kg)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="trend" 
                    stroke="#ff7c7c" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Trend"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Body Metrics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Body Composition</CardTitle>
                <CardDescription>Estimated body composition changes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Muscle', value: 45 },
                        { name: 'Fat', value: 20 },
                        { name: 'Water', value: 25 },
                        { name: 'Other', value: 10 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Important body measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current Weight</span>
                  <span className="text-lg font-bold">74.2 kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">BMI</span>
                  <span className="text-lg font-bold">22.1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Body Fat %</span>
                  <span className="text-lg font-bold">18.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Weekly Change</span>
                  <span className="text-lg font-bold text-green-500">-0.3 kg</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
