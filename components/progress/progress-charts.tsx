"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, BarChart3, Activity, Flame } from "lucide-react"
import { useEffect, useState } from "react"
import { UserStore, NutritionTracker, type UserProfile } from "@/lib/user-store"

// Sample data generators
const generateWorkoutData = (days: number) => {
  const data = []
  const today = new Date()
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const dayOfWeek = date.getDay()
    const isWorkoutDay = Math.random() > (dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 0.3) // Less likely on weekends
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      workouts: isWorkoutDay ? 1 : 0,
      calories: isWorkoutDay ? Math.floor(Math.random() * 200) + 250 : 0,
      duration: isWorkoutDay ? Math.floor(Math.random() * 30) + 20 : 0
    })
  }
  
  return data
}

const generateWeightData = (initialWeight: number) => {
  const data = []
  const today = new Date()
  let weight = initialWeight
  
  for (let i = 29; i >= 0; i -= 3) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Simulate gradual weight change
    weight += (Math.random() - 0.5) * 0.8
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight: Math.round(weight * 10) / 10
    })
  }
  
  return data
}

const generateNutritionData = () => {
  const data = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const targetCalories = 2000
    const actualCalories = Math.floor(Math.random() * 600) + 1400
    
    data.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      target: targetCalories,
      actual: actualCalories,
      protein: Math.floor(actualCalories * 0.25 / 4),
      carbs: Math.floor(actualCalories * 0.45 / 4),
      fats: Math.floor(actualCalories * 0.3 / 9)
    })
  }
  
  return data
}

const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981', 
  accent: '#f59e0b',
  muted: '#6b7280'
}

export function ProgressCharts() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [workoutData, setWorkoutData] = useState<any[]>([])
  const [weightData, setWeightData] = useState<any[]>([])
  const [nutritionData, setNutritionData] = useState<any[]>([])

  useEffect(() => {
    const userData = UserStore.getUser()
    setUser(userData)

    if (userData) {
      const days = Math.floor(
        (Date.now() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      
      setWorkoutData(generateWorkoutData(days))
      setWeightData(generateWeightData(parseFloat(userData.onboardingData.weight) || 70))
      setNutritionData(generateNutritionData())
    }
  }, [])

  const workoutFrequency = workoutData.filter(d => d.workouts > 0).length
  const totalCaloriesBurned = workoutData.reduce((sum, d) => sum + d.calories, 0)
  const averageWorkoutDuration = workoutData.filter(d => d.duration > 0)
    .reduce((sum, d, _, arr) => sum + d.duration / arr.length, 0)

  // Macro distribution for pie chart
  const macroData = [
    { name: 'Protein', value: 25, color: COLORS.primary },
    { name: 'Carbs', value: 45, color: COLORS.secondary },
    { name: 'Fats', value: 30, color: COLORS.accent }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-xl flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Progress Analytics
        </CardTitle>
        <CardDescription className="font-serif">
          Visual insights into your fitness journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="workouts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="workouts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3 mb-4">
              <div className="text-center p-3 rounded-lg bg-primary/10">
                <div className="font-sans text-lg font-bold text-primary">{workoutFrequency}</div>
                <div className="font-serif text-xs text-muted-foreground">Workouts (2 weeks)</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/10">
                <div className="font-sans text-lg font-bold text-secondary">{totalCaloriesBurned}</div>
                <div className="font-serif text-xs text-muted-foreground">Calories Burned</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-accent/10">
                <div className="font-sans text-lg font-bold text-accent">{Math.round(averageWorkoutDuration)}</div>
                <div className="font-serif text-xs text-muted-foreground">Avg Duration (min)</div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="calories" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weight" className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span>Trend: {user?.onboardingData.goal === 'weight-loss' ? 'Losing' : 'Gaining'}</span>
              </Badge>
              {weightData.length > 1 && (
                <Badge variant="secondary">
                  {Math.abs(weightData[weightData.length - 1]?.weight - weightData[0]?.weight).toFixed(1)}kg change
                </Badge>
              )}
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                    formatter={(value: any) => [`${value}kg`, 'Weight']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke={COLORS.secondary} 
                    strokeWidth={2}
                    dot={{ fill: COLORS.secondary, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-sans font-semibold mb-3">Weekly Calorie Intake</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={nutritionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="target" fill={COLORS.muted} name="Target" />
                      <Bar dataKey="actual" fill={COLORS.primary} name="Actual" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="font-sans font-semibold mb-3">Macro Distribution</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {macroData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="font-serif text-xs text-muted-foreground">
                        {entry.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
