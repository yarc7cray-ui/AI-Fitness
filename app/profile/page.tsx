import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { AchievementsBadges } from "@/components/profile/achievements-badges"
import { ProgressTimeline } from "@/components/profile/progress-timeline"
import { PersonalGoals } from "@/components/profile/personal-goals"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileStats />
            <ProgressTimeline />
          </div>
          <div className="space-y-6">
            <AchievementsBadges />
            <PersonalGoals />
          </div>
        </div>
      </div>
    </div>
  )
}
