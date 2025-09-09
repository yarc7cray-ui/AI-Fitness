import { PersonalGoals } from "@/components/profile/personal-goals"
import { AppPreferences } from "@/components/settings/app-preferences"

export function GoalsPreferencesSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <PersonalGoals />
      <AppPreferences />
    </div>
  )
}
