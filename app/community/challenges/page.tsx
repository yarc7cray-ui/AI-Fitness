import { ChallengeHeader } from "@/components/community/challenge-header"
import { FeaturedChallenges } from "@/components/community/featured-challenges"
import { ChallengeCategories } from "@/components/community/challenge-categories"
import { ChallengeGrid } from "@/components/community/challenge-grid"
import { MyActiveChallenges } from "@/components/community/my-active-challenges"

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-background">
      <ChallengeHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <MyActiveChallenges />
        <FeaturedChallenges />
        <ChallengeCategories />
        <ChallengeGrid />
      </main>
    </div>
  )
}
