import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, History, Play } from "lucide-react"
import Link from "next/link"

export function WorkoutHeader() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="font-sans text-xl font-bold text-foreground">Workout Library</h1>
              <Badge variant="secondary" className="text-xs">
                100+ Exercises
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/workouts/history">
              <Button variant="outline" size="sm">
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
            </Link>
            <Button size="sm" className="gradient-primary text-white hover:opacity-90">
              <Play className="mr-2 h-4 w-4" />
              Start Workout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
