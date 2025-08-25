"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Save, Edit3 } from "lucide-react"
import { UserStore, type UserProfile } from "@/lib/user-store"

export function PersonalInfoSection() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    height: "",
    weight: "",
    age: ""
  })

  useEffect(() => {
    const userData = UserStore.getUser()
    setUser(userData)
    
    if (userData) {
      setFormData({
        name: userData.name,
        height: userData.onboardingData.height,
        weight: userData.onboardingData.weight,
        age: userData.onboardingData.age
      })
    }
  }, [])

  const handleSave = () => {
    if (!user) return

    // Update user profile
    const updatedUser = {
      ...user,
      name: formData.name,
      onboardingData: {
        ...user.onboardingData,
        height: formData.height,
        weight: formData.weight,
        age: formData.age
      }
    }

    UserStore.saveUser(updatedUser)
    setUser(updatedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        height: user.onboardingData.height,
        weight: user.onboardingData.weight,
        age: user.onboardingData.age
      })
    }
    setIsEditing(false)
  }

  const calculateBMI = () => {
    const heightM = parseFloat(formData.height) / 100
    const weightKg = parseFloat(formData.weight)
    if (heightM && weightKg) {
      return (weightKg / (heightM * heightM)).toFixed(1)
    }
    return null
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "bg-blue-100 text-blue-700" }
    if (bmi < 25) return { category: "Normal", color: "bg-green-100 text-green-700" }
    if (bmi < 30) return { category: "Overweight", color: "bg-orange-100 text-orange-700" }
    return { category: "Obese", color: "bg-red-100 text-red-700" }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </CardContent>
      </Card>
    )
  }

  const bmi = calculateBMI()
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-sans text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription className="font-serif">
              Update your basic profile information
            </CardDescription>
          </div>
          <Button
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            variant="outline"
            size="sm"
          >
            <Edit3 className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
              />
            ) : (
              <div className="p-2 bg-muted/30 rounded-md font-sans font-medium">
                {user.name}
              </div>
            )}
          </div>

          {/* Physical Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              {isEditing ? (
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="170"
                />
              ) : (
                <div className="p-2 bg-muted/30 rounded-md">
                  {user.onboardingData.height} cm
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              {isEditing ? (
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="70"
                />
              ) : (
                <div className="p-2 bg-muted/30 rounded-md">
                  {user.onboardingData.weight} kg
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              {isEditing ? (
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="25"
                />
              ) : (
                <div className="p-2 bg-muted/30 rounded-md">
                  {user.onboardingData.age} years
                </div>
              )}
            </div>

            {/* BMI Display */}
            <div className="space-y-2">
              <Label>BMI</Label>
              <div className="p-2 bg-muted/30 rounded-md flex items-center gap-2">
                <span className="font-sans font-bold">{bmi || "--"}</span>
                {bmiCategory && (
                  <Badge className={`text-xs ${bmiCategory.color}`}>
                    {bmiCategory.category}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm text-muted-foreground">Member Since</span>
              <span className="font-sans text-sm font-medium">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric', 
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-serif text-sm text-muted-foreground">Experience Level</span>
              <Badge variant="outline" className="capitalize">
                {user.onboardingData.experience}
              </Badge>
            </div>
          </div>

          {/* Save Changes */}
          {isEditing && (
            <div className="pt-4 border-t">
              <Button onClick={handleSave} className="w-full gradient-primary text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
