import { SettingsHeader } from "@/components/settings/settings-header"
import { AccountSettings } from "@/components/settings/account-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PrivacySettings } from "@/components/settings/privacy-settings"
import { AppPreferences } from "@/components/settings/app-preferences"
import { TrainerIntegration } from "@/components/settings/trainer-integration"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <SettingsHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AccountSettings />
            <NotificationSettings />
            <TrainerIntegration />
          </div>
          <div className="space-y-6">
            <PrivacySettings />
            <AppPreferences />
          </div>
        </div>
      </div>
    </div>
  )
}
