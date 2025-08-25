import { ArrowLeft, Search, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function RecipeHeader() {
  return (
    <header className="bg-gradient-to-r from-primary to-accent text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/nutrition">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nutrition
            </Button>
          </Link>
          <h1 className="font-sans text-xl font-bold">Recipe Library</h1>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search healthy recipes..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
          />
        </div>
      </div>
    </header>
  )
}
