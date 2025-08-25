import { Card, CardContent } from "@/components/ui/card"
import { Users, Trophy, Target, Zap } from "lucide-react"

const communityStats = [
  {
    label: "Friends",
    value: "24",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Challenges Won",
    value: "8",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    label: "Active Challenges",
    value: "3",
    icon: Target,
    color: "text-primary",
  },
  {
    label: "Community Rank",
    value: "#127",
    icon: Zap,
    color: "text-accent",
  },
]

export function CommunityStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {communityStats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4 text-center space-y-2">
            <stat.icon className={`h-6 w-6 mx-auto ${stat.color}`} />
            <div className="font-sans text-2xl font-bold">{stat.value}</div>
            <div className="font-serif text-sm text-muted-foreground">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
