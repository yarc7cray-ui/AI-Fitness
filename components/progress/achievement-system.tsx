"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Flame, Target, Apple, Dumbbell, Users, Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import { ProgressTracker, type Achievement } from "@/lib/user-store"

const iconMap = {
  'Dumbbell': Dumbbell,
  'Trophy': Trophy,
  'Apple': Apple,
  'Flame': Flame,
  'Target': Target,
  'Star': Star,
  'Users': Users,
  'Calendar': Calendar
}

export function AchievementSystem() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [unlockedCount, setUnlockedCount] = useState(0)

  useEffect(() => {
    const achievementData = ProgressTracker.getAchievements()
    setAchievements(achievementData)
    
    const unlocked = achievementData.filter(a => a.unlockedAt).length
    setUnlockedCount(unlocked)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workout':
        return 'text-primary'
      case 'nutrition':
        return 'text-secondary'
      case 'streak':
        return 'text-orange-500'
      case 'progress':
        return 'text-purple-500'
      default:
        return 'text-muted-foreground'
    }
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'workout':
        return 'bg-primary/10 text-primary'
      case 'nutrition':
        return 'bg-secondary/10 text-secondary'
      case 'streak':
        return 'bg-orange-100 text-orange-700'
      case 'progress':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Achievements
          <Badge variant="secondary" className="ml-2">
            {unlockedCount}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Overview */}
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif text-sm text-muted-foreground">Overall Progress</span>
              <span className="font-sans text-sm font-medium">
                {Math.round((unlockedCount / achievements.length) * 100)}%
              </span>
            </div>
            <Progress value={(unlockedCount / achievements.length) * 100} className="h-2" />
          </div>

          {/* Achievement List */}
          <div className="space-y-3">
            {achievements.map((achievement) => {
              const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Star
              const isUnlocked = !!achievement.unlockedAt
              const progressPercent = (achievement.progress / achievement.target) * 100

              return (
                <div 
                  key={achievement.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isUnlocked 
                      ? 'border-accent/50 bg-accent/5 shadow-sm' 
                      : 'border-border bg-muted/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isUnlocked ? 'bg-accent/20' : 'bg-muted/50'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        isUnlocked ? 'text-accent' : 'text-muted-foreground'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-sans font-medium text-sm ${
                          isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.title}
                        </h3>
                        {isUnlocked && (
                          <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                            Unlocked!
                          </Badge>
                        )}
                      </div>
                      
                      <p className="font-serif text-xs text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs ${getCategoryBadgeColor(achievement.category)}`}>
                            {achievement.category}
                          </Badge>
                          <span className="font-sans text-xs text-muted-foreground">
                            {achievement.progress}/{achievement.target}
                          </span>
                        </div>
                        
                        {!isUnlocked && (
                          <Progress value={progressPercent} className="h-1.5" />
                        )}
                      </div>
                      
                      {isUnlocked && achievement.unlockedAt && (
                        <div className="mt-2 text-xs text-muted-foreground font-serif">
                          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Motivational Message */}
          {unlockedCount > 0 && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="text-center">
                <Star className="h-5 w-5 text-accent mx-auto mb-1" />
                <p className="font-serif text-xs text-muted-foreground">
                  {unlockedCount === achievements.length 
                    ? "🎉 Amazing! You've unlocked all achievements!"
                    : `Great job! ${achievements.length - unlockedCount} more achievements to unlock.`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
