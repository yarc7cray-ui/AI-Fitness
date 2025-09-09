import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LeaderboardRankings } from "@/components/community/leaderboard-rankings"
import { Users, Globe2, UserCircle2 } from "lucide-react"

export function LeaderboardTabs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overall" className="w-full">
          <TabsList>
            <TabsTrigger value="overall" className="flex items-center gap-2">
              <Globe2 className="h-4 w-4" /> Overall
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Friends
            </TabsTrigger>
            <TabsTrigger value="local" className="flex items-center gap-2">
              <UserCircle2 className="h-4 w-4" /> Local
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="mt-4">
            <LeaderboardRankings />
          </TabsContent>
          <TabsContent value="friends" className="mt-4">
            <LeaderboardRankings />
          </TabsContent>
          <TabsContent value="local" className="mt-4">
            <LeaderboardRankings />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
