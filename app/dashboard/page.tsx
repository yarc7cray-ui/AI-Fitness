import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DailyStats } from "@/components/dashboard/daily-stats"
import { TodaysPlan } from "@/components/dashboard/todays-plan"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ProgressAnalytics } from "@/components/dashboard/progress-analytics"
import { SocialFeed } from "@/components/dashboard/social-feed"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <DailyStats />
            <TodaysPlan />
            <ProgressAnalytics />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions />
            <SocialFeed />
          </div>
        </div>
      </main>
    </div>
  )
}
