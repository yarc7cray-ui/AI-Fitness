import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <h2 className="mt-4 text-xl font-semibold">Loading your dashboard...</h2>
        <p className="mt-2 text-sm text-muted-foreground">Just a moment while we get everything ready</p>
      </div>
    </div>
  )
}
