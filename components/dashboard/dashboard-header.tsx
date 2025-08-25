"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, Flame, LogOut, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { UserStore, type UserProfile } from "@/lib/user-store"

export function DashboardHeader() {
  const { data: session } = useSession()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const userData = UserStore.getUser()
    setUser(userData)
    
    // Calculate streak (simplified - in real app would track actual workout completions)
    if (userData) {
      const daysSinceCreated = Math.floor(
        (Date.now() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      setStreak(Math.min(daysSinceCreated + 1, 7)) // Max 7 for demo
    }
  }, [])

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-sans text-xl font-bold gradient-text">Coach Online</h1>
            {streak > 0 && (
              <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                <Flame className="h-3 w-3 text-accent" />
                <span className="font-sans">{streak} Day Streak!</span>
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent rounded-full" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || "/placeholder.svg?height=32&width=32"} />
                    <AvatarFallback className="font-sans text-xs">
                      {session?.user?.name ? getInitials(session.user.name) : (user ? getInitials(user.name) : 'U')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name || user?.name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email || 'user@example.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
