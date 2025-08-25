import { LeaderboardHeader } from "@/components/community/leaderboard-header"
import { LeaderboardTabs } from "@/components/community/leaderboard-tabs"
import { TopPerformers } from "@/components/community/top-performers"
import { MyRanking } from "@/components/community/my-ranking"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <LeaderboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <MyRanking />
        <TopPerformers />
        <LeaderboardTabs />
      </main>
    </div>
  )
}
