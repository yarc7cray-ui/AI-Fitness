import { CommunityHeader } from "@/components/community/community-header"
import { SocialFeed } from "@/components/community/social-feed"
import { ActiveChallenges } from "@/components/community/active-challenges"
import { FriendSuggestions } from "@/components/community/friend-suggestions"
import { CommunityStats } from "@/components/community/community-stats"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <CommunityHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <CommunityStats />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <SocialFeed />
          </div>

          <div className="space-y-6">
            <ActiveChallenges />
            <FriendSuggestions />
          </div>
        </div>
      </main>
    </div>
  )
}
