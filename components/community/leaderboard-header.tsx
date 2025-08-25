import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function LeaderboardHeader() {
  return (
    <header className="bg-gradient-to-r from-primary to-accent text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/community">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Community
            </Button>
          </Link>
          <h1 className="font-sans text-xl font-bold">Leaderboard</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Trophy className="h-3 w-3 mr-1" />
              Season 3
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <Medal className="h-4 w-4 text-yellow-300" />
            <span className="font-serif text-sm">Weekly</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-300" />
            <span className="font-serif text-sm">Monthly</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-yellow-300" />
            <span className="font-serif text-sm">All Time</span>
          </div>
        </div>
      </div>
    </header>
  )
}
