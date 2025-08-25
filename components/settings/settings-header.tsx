"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function SettingsHeader() {
  const router = useRouter()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account and app preferences</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
