"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Scale, Plus, TrendingUp, TrendingDown } from "lucide-react"
import { ProgressTracker, UserStore, type WeightEntry, type UserProfile } from "@/lib/user-store"

export function WeightTracker() {
  const [isOpen, setIsOpen] = useState(false)
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([])
  const [user, setUser] = useState<UserProfile | null>(null)
  const [newWeight, setNewWeight] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const userData = UserStore.getUser()
    setUser(userData)
    
    const entries = ProgressTracker.getWeightHistory()
    setWeightEntries(entries)
  }, [])

  const handleAddWeight = () => {
    const weight = parseFloat(newWeight)
    if (!weight || weight <= 0) return

    ProgressTracker.addWeightEntry(weight, notes.trim() || undefined)
    
    // Refresh entries
    const updatedEntries = ProgressTracker.getWeightHistory()
    setWeightEntries(updatedEntries)
    
    // Reset form
    setNewWeight("")
    setNotes("")
    setIsOpen(false)
  }

  const getCurrentWeight = () => {
    if (weightEntries.length > 0) {
      return weightEntries[weightEntries.length - 1].weight
    }
    return user ? parseFloat(user.onboardingData.weight) : 0
  }

  const getWeightChange = () => {
    if (weightEntries.length < 2) return null
    
    const current = weightEntries[weightEntries.length - 1].weight
    const previous = weightEntries[weightEntries.length - 2].weight
    const change = current - previous
    
    return {
      amount: Math.abs(change),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'same'
    }
  }

  const getGoalProgress = () => {
    if (!user || weightEntries.length === 0) return null
    
    const initialWeight = parseFloat(user.onboardingData.weight)
    const currentWeight = getCurrentWeight()
    const goal = user.onboardingData.goal
    
    if (goal === 'weight-loss') {
      const targetLoss = initialWeight * 0.1 // 10% weight loss goal
      const actualLoss = initialWeight - currentWeight
      return {
        progress: Math.max(0, (actualLoss / targetLoss) * 100),
        target: targetLoss,
        actual: actualLoss,
        direction: 'loss'
      }
    } else if (goal === 'muscle-gain') {
      const targetGain = initialWeight * 0.05 // 5% weight gain goal
      const actualGain = currentWeight - initialWeight
      return {
        progress: Math.max(0, (actualGain / targetGain) * 100),
        target: targetGain,
        actual: actualGain,
        direction: 'gain'
      }
    }
    
    return null
  }

  const currentWeight = getCurrentWeight()
  const weightChange = getWeightChange()
  const goalProgress = getGoalProgress()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-sans text-lg flex items-center gap-2">
            <Scale className="h-5 w-5 text-secondary" />
            Weight Progress
          </CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Log Weight
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Your Weight</DialogTitle>
                <DialogDescription>
                  Track your weight progress over time
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="70.5"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Feeling great today..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleAddWeight}
                  disabled={!newWeight}
                  className="w-full gradient-primary text-white"
                >
                  Log Weight
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Weight Display */}
          <div className="text-center p-4 rounded-lg bg-secondary/10">
            <div className="font-sans text-3xl font-bold text-secondary">
              {currentWeight.toFixed(1)}
            </div>
            <div className="font-serif text-sm text-muted-foreground">kg</div>
          </div>

          {/* Weight Change */}
          {weightChange && (
            <div className="flex items-center justify-center gap-2">
              {weightChange.direction === 'up' ? (
                <TrendingUp className="h-4 w-4 text-red-500" />
              ) : weightChange.direction === 'down' ? (
                <TrendingDown className="h-4 w-4 text-green-500" />
              ) : null}
              <span className={`font-sans text-sm ${
                weightChange.direction === 'up' ? 'text-red-500' : 
                weightChange.direction === 'down' ? 'text-green-500' : 
                'text-muted-foreground'
              }`}>
                {weightChange.direction === 'up' ? '+' : '-'}{weightChange.amount.toFixed(1)}kg
              </span>
              <span className="font-serif text-xs text-muted-foreground">from last entry</span>
            </div>
          )}

          {/* Goal Progress */}
          {goalProgress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm text-muted-foreground">
                  {goalProgress.direction === 'loss' ? 'Weight Loss Goal' : 'Weight Gain Goal'}
                </span>
                <span className="font-sans text-xs text-muted-foreground">
                  {goalProgress.actual.toFixed(1)}/{goalProgress.target.toFixed(1)}kg
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-secondary h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(goalProgress.progress, 100)}%` }}
                />
              </div>
              <div className="text-center">
                <span className="font-sans text-xs text-muted-foreground">
                  {Math.round(goalProgress.progress)}% of goal achieved
                </span>
              </div>
            </div>
          )}

          {/* Recent Entries */}
          {weightEntries.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-sans text-sm font-medium">Recent Entries</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {weightEntries.slice(-5).reverse().map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                    <div>
                      <div className="font-sans text-sm font-medium">{entry.weight}kg</div>
                      <div className="font-serif text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                    </div>
                    {entry.notes && (
                      <div className="font-serif text-xs text-muted-foreground max-w-24 truncate">
                        {entry.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Encouragement Message */}
          <div className="p-3 rounded-lg bg-primary/10 text-center">
            <p className="font-serif text-xs text-muted-foreground">
              {user?.onboardingData.goal === 'weight-loss' 
                ? "Consistency is key to healthy weight loss!"
                : user?.onboardingData.goal === 'muscle-gain'
                ? "Building muscle takes time and patience!"
                : "Tracking helps you stay aware of your progress!"
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
