"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Clock, 
  Dumbbell, 
  Target, 
  Users, 
  Search,
  Filter,
  Play,
  Zap,
  Heart,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import { WORKOUT_TEMPLATES, ExerciseDatabase, type WorkoutTemplate, type Equipment } from "@/lib/exercise-database"

interface WorkoutTemplatesProps {
  onSelectTemplate?: (templateId: string) => void
  showStartButton?: boolean
}

export function WorkoutTemplates({ onSelectTemplate, showStartButton = true }: WorkoutTemplatesProps) {
  const [templates] = useState<WorkoutTemplate[]>(WORKOUT_TEMPLATES)
  const [filteredTemplates, setFilteredTemplates] = useState<WorkoutTemplate[]>(WORKOUT_TEMPLATES)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter templates based on criteria
  useEffect(() => {
    let filtered = templates

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Difficulty filter
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter(template =>
        selectedDifficulty.includes(template.difficulty)
      )
    }

    // Goal filter
    if (selectedGoals.length > 0) {
      filtered = filtered.filter(template =>
        selectedGoals.includes(template.goal)
      )
    }

    // Equipment filter
    if (selectedEquipment.length > 0) {
      filtered = filtered.filter(template =>
        template.equipment.every(eq => selectedEquipment.includes(eq))
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(template =>
        selectedCategories.includes(template.category)
      )
    }

    setFilteredTemplates(filtered)
  }, [templates, searchQuery, selectedDifficulty, selectedGoals, selectedEquipment, selectedCategories])

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (checked) {
      setSelectedDifficulty([...selectedDifficulty, difficulty])
    } else {
      setSelectedDifficulty(selectedDifficulty.filter(d => d !== difficulty))
    }
  }

  const handleGoalChange = (goal: string, checked: boolean) => {
    if (checked) {
      setSelectedGoals([...selectedGoals, goal])
    } else {
      setSelectedGoals(selectedGoals.filter(g => g !== goal))
    }
  }

  const handleEquipmentChange = (equipment: Equipment, checked: boolean) => {
    if (checked) {
      setSelectedEquipment([...selectedEquipment, equipment])
    } else {
      setSelectedEquipment(selectedEquipment.filter(e => e !== equipment))
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDifficulty([])
    setSelectedGoals([])
    setSelectedEquipment([])
    setSelectedCategories([])
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength': return <Dumbbell className="h-4 w-4" />
      case 'cardio': return <Heart className="h-4 w-4" />
      case 'hiit': return <Zap className="h-4 w-4" />
      case 'flexibility': return <TrendingUp className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getGoalIcon = (goal: string) => {
    switch (goal) {
      case 'muscle-gain': return <Dumbbell className="h-4 w-4" />
      case 'weight-loss': return <Zap className="h-4 w-4" />
      case 'endurance': return <Heart className="h-4 w-4" />
      case 'strength': return <TrendingUp className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workout templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {(selectedDifficulty.length + selectedGoals.length + selectedEquipment.length + selectedCategories.length) > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedDifficulty.length + selectedGoals.length + selectedEquipment.length + selectedCategories.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Filter Workouts
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Difficulty Filter */}
              <div className="space-y-3">
                <Label className="font-medium">Difficulty Level</Label>
                <div className="space-y-2">
                  {['beginner', 'intermediate', 'advanced'].map(difficulty => (
                    <div key={difficulty} className="flex items-center space-x-2">
                      <Checkbox
                        id={`difficulty-${difficulty}`}
                        checked={selectedDifficulty.includes(difficulty)}
                        onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                      />
                      <Label htmlFor={`difficulty-${difficulty}`} className="capitalize text-sm">
                        {difficulty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goal Filter */}
              <div className="space-y-3">
                <Label className="font-medium">Fitness Goal</Label>
                <div className="space-y-2">
                  {['muscle-gain', 'weight-loss', 'endurance', 'strength', 'maintenance'].map(goal => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={`goal-${goal}`}
                        checked={selectedGoals.includes(goal)}
                        onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
                      />
                      <Label htmlFor={`goal-${goal}`} className="text-sm">
                        {goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <Label className="font-medium">Workout Type</Label>
                <div className="space-y-2">
                  {['strength', 'cardio', 'hiit', 'flexibility', 'mixed'].map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={`category-${category}`} className="capitalize text-sm">
                        {category === 'hiit' ? 'HIIT' : category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Filter */}
              <div className="space-y-3">
                <Label className="font-medium">Equipment</Label>
                <div className="space-y-2">
                  {['none', 'dumbbells', 'barbell', 'kettlebell', 'resistance-bands', 'pull-up-bar', 'bench'].map(equipment => (
                    <div key={equipment} className="flex items-center space-x-2">
                      <Checkbox
                        id={`equipment-${equipment}`}
                        checked={selectedEquipment.includes(equipment as Equipment)}
                        onCheckedChange={(checked) => handleEquipmentChange(equipment as Equipment, checked as boolean)}
                      />
                      <Label htmlFor={`equipment-${equipment}`} className="text-sm">
                        {equipment === 'none' ? 'No Equipment' : equipment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredTemplates.length} of {templates.length} workout templates
        </p>
      </div>

      {/* Workout Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="font-sans text-lg">{template.name}</CardTitle>
                  <CardDescription className="font-serif">
                    {template.description}
                  </CardDescription>
                </div>
                <Badge className={getDifficultyColor(template.difficulty)}>
                  {template.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Template Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-sans text-lg font-bold text-primary">{template.duration}</div>
                  <div className="font-serif text-xs text-muted-foreground">minutes</div>
                </div>
                <div>
                  <div className="font-sans text-lg font-bold text-secondary">{template.exercises.length}</div>
                  <div className="font-serif text-xs text-muted-foreground">exercises</div>
                </div>
                <div className="flex flex-col items-center">
                  {getCategoryIcon(template.category)}
                  <div className="font-serif text-xs text-muted-foreground mt-1">{template.category}</div>
                </div>
              </div>

              {/* Goal and Equipment Tags */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getGoalIcon(template.goal)}
                  <span className="text-sm font-medium">
                    {template.goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {template.equipment.slice(0, 3).map(equipment => (
                    <Badge key={equipment} variant="outline" className="text-xs">
                      {equipment === 'none' ? 'No Equipment' : equipment.replace('-', ' ')}
                    </Badge>
                  ))}
                  {template.equipment.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.equipment.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Exercise Preview */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Exercises:</Label>
                <div className="space-y-1">
                  {template.exercises.slice(0, 3).map((exercise, index) => {
                    const exerciseData = ExerciseDatabase.getExerciseById(exercise.exerciseId)
                    return (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {exerciseData?.name || exercise.exerciseId}
                      </div>
                    )
                  })}
                  {template.exercises.length > 3 && (
                    <div className="text-sm text-muted-foreground">
                      • +{template.exercises.length - 3} more exercises
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              {showStartButton && (
                <div className="pt-2">
                  {onSelectTemplate ? (
                    <Button 
                      onClick={() => onSelectTemplate(template.id)}
                      className="w-full gradient-primary text-white hover:opacity-90"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Workout
                    </Button>
                  ) : (
                    <Link href={`/workout/${template.id}`}>
                      <Button className="w-full gradient-primary text-white hover:opacity-90">
                        <Play className="mr-2 h-4 w-4" />
                        Start Workout
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto" />
            <div className="space-y-2">
              <h3 className="font-sans font-semibold">No workouts found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search terms
              </p>
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
