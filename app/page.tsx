import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { CTASection } from "@/components/cta-section"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <CTASection />
    </main>
  )
}
