import { ArrowLeft, Search, Trophy, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function CommunityHeader() {
  return (
    <header className="bg-gradient-to-r from-primary to-accent text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <h1 className="font-sans text-xl font-bold">Community</h1>
          <div className="flex items-center gap-2">
            <Link href="/community/challenges">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Trophy className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 relative">
              <MessageCircle className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">3</Badge>
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search friends, challenges, or groups..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
          />
        </div>
      </div>
    </header>
  )
}
