"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, MapPin } from "lucide-react"

export function AccountSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" defaultValue="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex gap-2">
            <Mail className="h-4 w-4 mt-3 text-muted-foreground" />
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex gap-2">
            <Phone className="h-4 w-4 mt-3 text-muted-foreground" />
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex gap-2">
            <MapPin className="h-4 w-4 mt-3 text-muted-foreground" />
            <Input id="location" defaultValue="New York, NY" />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            Save Changes
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  )
}
