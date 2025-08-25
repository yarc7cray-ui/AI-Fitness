"use client"

import { ProfileHeader } from "@/components/profile/profile-header"
import { PersonalInfoSection } from "@/components/profile/personal-info-section"
import { GoalsPreferencesSection } from "@/components/goals-preferences-section"
import { AccountSettingsSection } from "@/components/profile/account-settings-section"
import { DataManagementSection } from "@/components/profile/data-management-section"
import { ProfileStats } from "@/components/profile/profile-stats"
import { AchievementsBadges } from "@/components/profile/achievements-badges"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ProfileStats />
              </div>
              <div>
                <AchievementsBadges />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <PersonalInfoSection />
                <GoalsPreferencesSection />
              </div>
              <div className="space-y-6">
                <AccountSettingsSection />
                <DataManagementSection />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementsBadges expanded={true} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
