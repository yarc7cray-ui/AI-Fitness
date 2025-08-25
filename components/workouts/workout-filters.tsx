"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Filter } from "lucide-react"

const bodyParts = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Glutes", "Cardio"]

const equipment = ["Bodyweight", "Dumbbells", "Barbell", "Resistance Bands", "Pull-up Bar", "Gym Equipment"]

const difficulty = ["Beginner", "Intermediate", "Advanced"]

export function WorkoutFilters() {
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [duration, setDuration] = useState([30])

  const handleBodyPartChange = (bodyPart: string, checked: boolean) => {
    if (checked) {
      setSelectedBodyParts([...selectedBodyParts, bodyPart])
    } else {
      setSelectedBodyParts(selectedBodyParts.filter((bp) => bp !== bodyPart))
    }
  }

  const handleEquipmentChange = (equipmentItem: string, checked: boolean) => {
    if (checked) {
      setSelectedEquipment([...selectedEquipment, equipmentItem])
    } else {
      setSelectedEquipment(selectedEquipment.filter((eq) => eq !== equipmentItem))
    }
  }

  const handleDifficultyChange = (difficultyLevel: string, checked: boolean) => {
    if (checked) {
      setSelectedDifficulty([...selectedDifficulty, difficultyLevel])
    } else {
      setSelectedDifficulty(selectedDifficulty.filter((d) => d !== difficultyLevel))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Body Parts */}
        <div>
          <Label className="font-sans font-medium mb-3 block">Body Parts</Label>
          <div className="space-y-2">
            {bodyParts.map((bodyPart) => (
              <div key={bodyPart} className="flex items-center space-x-2">
                <Checkbox
                  id={bodyPart}
                  checked={selectedBodyParts.includes(bodyPart)}
                  onCheckedChange={(checked) => handleBodyPartChange(bodyPart, checked as boolean)}
                />
                <Label htmlFor={bodyPart} className="font-serif text-sm cursor-pointer">
                  {bodyPart}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <Label className="font-sans font-medium mb-3 block">Equipment</Label>
          <div className="space-y-2">
            {equipment.map((equipmentItem) => (
              <div key={equipmentItem} className="flex items-center space-x-2">
                <Checkbox
                  id={equipmentItem}
                  checked={selectedEquipment.includes(equipmentItem)}
                  onCheckedChange={(checked) => handleEquipmentChange(equipmentItem, checked as boolean)}
                />
                <Label htmlFor={equipmentItem} className="font-serif text-sm cursor-pointer">
                  {equipmentItem}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <Label className="font-sans font-medium mb-3 block">Difficulty</Label>
          <div className="space-y-2">
            {difficulty.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={selectedDifficulty.includes(level)}
                  onCheckedChange={(checked) => handleDifficultyChange(level, checked as boolean)}
                />
                <Label htmlFor={level} className="font-serif text-sm cursor-pointer">
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <Label className="font-sans font-medium mb-3 block">Duration: {duration[0]} minutes</Label>
          <Slider value={duration} onValueChange={setDuration} max={120} min={10} step={5} className="w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
