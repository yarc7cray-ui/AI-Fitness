"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Target, Dumbbell, Home, Calendar } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: "goals", title: "Your Goals", icon: Target },
  { id: "personal", title: "Personal Info", icon: Dumbbell },
  { id: "preferences", title: "Training Preferences", icon: Home },
  { id: "schedule", title: "Schedule", icon: Calendar },
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    goal: "",
    height: "",
    weight: "",
    age: "",
    experience: "",
    equipment: [],
    daysPerWeek: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding - redirect to dashboard
      window.location.href = "/dashboard"
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
        <h1 className="font-sans text-3xl font-bold text-foreground">
          Let's Create Your <span className="gradient-text">Perfect Plan</span>
        </h1>
        <p className="mt-2 font-serif text-muted-foreground">
          Just a few questions to personalize your fitness journey
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  index <= currentStep ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                }`}
              >
                <step.icon className="h-4 w-4" />
              </div>
              <span className="ml-2 hidden sm:block font-serif text-sm">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-muted rounded-full">
          <div
            className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-xl">{steps[currentStep].title}</CardTitle>
          <CardDescription className="font-serif">
            {currentStep === 0 && "What's your primary fitness goal?"}
            {currentStep === 1 && "Help us understand your current fitness level"}
            {currentStep === 2 && "What equipment do you have access to?"}
            {currentStep === 3 && "How many days per week can you train?"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Goals */}
          {currentStep === 0 && (
            <RadioGroup value={formData.goal} onValueChange={(value) => updateFormData("goal", value)}>
              {[
                { value: "weight-loss", label: "Lose Weight", desc: "Burn fat and get lean" },
                { value: "muscle-gain", label: "Gain Muscle", desc: "Build strength and size" },
                { value: "endurance", label: "Improve Endurance", desc: "Boost cardiovascular fitness" },
                { value: "maintenance", label: "Stay Healthy", desc: "Maintain current fitness level" },
              ].map((goal) => (
                <div key={goal.value} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50">
                  <RadioGroupItem value={goal.value} id={goal.value} />
                  <div className="flex-1">
                    <Label htmlFor={goal.value} className="font-sans font-medium cursor-pointer">
                      {goal.label}
                    </Label>
                    <p className="font-serif text-sm text-muted-foreground">{goal.desc}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="height" className="font-sans">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => updateFormData("height", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="font-sans">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => updateFormData("weight", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age" className="font-sans">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-sans">Experience Level</Label>
                <RadioGroup value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
                  {["beginner", "intermediate", "advanced"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={level} />
                      <Label htmlFor={level} className="font-serif capitalize cursor-pointer">
                        {level}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 3: Equipment */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {[
                { id: "gym", label: "Full Gym Access", desc: "All equipment available" },
                { id: "home-basic", label: "Home - Basic Equipment", desc: "Dumbbells, resistance bands" },
                { id: "bodyweight", label: "Bodyweight Only", desc: "No equipment needed" },
              ].map((equipment) => (
                <div key={equipment.id} className="flex items-center space-x-3 p-4 rounded-lg border">
                  <Checkbox
                    id={equipment.id}
                    checked={formData.equipment.includes(equipment.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFormData("equipment", [...formData.equipment, equipment.id])
                      } else {
                        updateFormData(
                          "equipment",
                          formData.equipment.filter((e: string) => e !== equipment.id),
                        )
                      }
                    }}
                  />
                  <div className="flex-1">
                    <Label htmlFor={equipment.id} className="font-sans font-medium cursor-pointer">
                      {equipment.label}
                    </Label>
                    <p className="font-serif text-sm text-muted-foreground">{equipment.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Schedule */}
          {currentStep === 3 && (
            <RadioGroup value={formData.daysPerWeek} onValueChange={(value) => updateFormData("daysPerWeek", value)}>
              {[
                { value: "3", label: "3 days per week", desc: "Perfect for beginners" },
                { value: "4", label: "4 days per week", desc: "Balanced approach" },
                { value: "5", label: "5 days per week", desc: "Serious commitment" },
                { value: "6", label: "6+ days per week", desc: "Advanced training" },
              ].map((schedule) => (
                <div
                  key={schedule.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50"
                >
                  <RadioGroupItem value={schedule.value} id={schedule.value} />
                  <div className="flex-1">
                    <Label htmlFor={schedule.value} className="font-sans font-medium cursor-pointer">
                      {schedule.label}
                    </Label>
                    <p className="font-serif text-sm text-muted-foreground">{schedule.desc}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext} className="gradient-primary text-white hover:opacity-90">
          {currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
