"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Save, Timer } from "lucide-react"

interface WorkoutTrackerProps {
  exerciseId: string
}

export function WorkoutTracker({ exerciseId }: WorkoutTrackerProps) {
  const [sets, setSets] = useState([
    { reps: 10, weight: 0, completed: false },
    { reps: 10, weight: 0, completed: false },
    { reps: 10, weight: 0, completed: false },
  ])
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [restTime, setRestTime] = useState(60)

  const addSet = () => {
    setSets([...sets, { reps: 10, weight: 0, completed: false }])
  }

  const removeSet = (index: number) => {
    setSets(sets.filter((_, i) => i !== index))
  }

  const updateSet = (index: number, field: "reps" | "weight", value: number) => {
    const newSets = [...sets]
    newSets[index][field] = value
    setSets(newSets)
  }

  const toggleSetComplete = (index: number) => {
    const newSets = [...sets]
    newSets[index].completed = !newSets[index].completed
    setSets(newSets)
  }

  return (
    <div className="space-y-6">
      {/* Current Workout */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg flex items-center gap-2">
            <Timer className="h-4 w-4" />
            Track Workout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sets */}
          <div>
            <Label className="font-sans font-medium mb-3 block">Sets</Label>
            <div className="space-y-3">
              {sets.map((set, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-sans font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div>
                      <Label className="font-serif text-xs text-muted-foreground">Reps</Label>
                      <Input
                        type="number"
                        value={set.reps}
                        onChange={(e) => updateSet(index, "reps", Number.parseInt(e.target.value) || 0)}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <Label className="font-serif text-xs text-muted-foreground">Weight (kg)</Label>
                      <Input
                        type="number"
                        value={set.weight}
                        onChange={(e) => updateSet(index, "weight", Number.parseInt(e.target.value) || 0)}
                        className="h-8"
                      />
                    </div>
                  </div>
                  <Button
                    variant={set.completed ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSetComplete(index)}
                    className={set.completed ? "bg-secondary hover:bg-secondary/80" : ""}
                  >
                    ✓
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeSet(index)} disabled={sets.length <= 1}>
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={addSet} className="w-full mt-3 bg-transparent">
              <Plus className="mr-2 h-4 w-4" />
              Add Set
            </Button>
          </div>

          {/* Rest Timer */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-sans font-medium">Rest Timer</Label>
              <Badge variant="outline">{restTime}s</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setRestTime(Math.max(30, restTime - 15))}>
                -15s
              </Button>
              <Button
                variant={isTimerRunning ? "destructive" : "default"}
                className="flex-1"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
              >
                {isTimerRunning ? "Stop" : "Start"} Rest
              </Button>
              <Button variant="outline" size="sm" onClick={() => setRestTime(restTime + 15)}>
                +15s
              </Button>
            </div>
          </div>

          <Button className="w-full gradient-primary text-white hover:opacity-90">
            <Save className="mr-2 h-4 w-4" />
            Save Workout
          </Button>
        </CardContent>
      </Card>

      {/* Personal Records */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-lg">Personal Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
            <div>
              <div className="font-sans font-medium text-sm">Max Reps</div>
              <div className="font-serif text-xs text-muted-foreground">Single set</div>
            </div>
            <div className="text-right">
              <div className="font-sans font-bold text-accent">25</div>
              <div className="font-serif text-xs text-muted-foreground">2 weeks ago</div>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
            <div>
              <div className="font-sans font-medium text-sm">Total Volume</div>
              <div className="font-serif text-xs text-muted-foreground">Best session</div>
            </div>
            <div className="text-right">
              <div className="font-sans font-bold text-primary">180</div>
              <div className="font-serif text-xs text-muted-foreground">1 week ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
