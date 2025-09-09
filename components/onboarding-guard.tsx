'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { data, error } = useSWR('/api/profile', fetcher)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data || error) setLoading(false)
  }, [data, error])

  if (loading) return <div className="onboarding-loading">Loading...</div>
  if (error) return <div className="onboarding-error">Error loading profile</div>

  const profile = data?.profile
  const hasOnboard = profile && (profile.goals || profile.prefs)
  if (!hasOnboard) {
    return (
      <div className="onboarding-cta p-6">
        <h2 className="text-lg font-semibold">Welcome — set up your goals</h2>
        <p className="mt-2">We need a few details to personalize your plan.</p>
        <a href="/onboarding" className="mt-4 inline-block rounded bg-blue-600 text-white px-4 py-2">Start onboarding</a>
      </div>
    )
  }

  return <>{children}</>
}
