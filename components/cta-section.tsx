import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Ready to Transform Your <span className="gradient-text">Fitness Journey</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-8 text-muted-foreground sm:text-xl">
          Join over 500,000 people who are already training smarter with AI-powered coaching. Start your personalized
          fitness journey today – completely free.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/onboarding">
            <Button size="lg" className="gradient-primary text-white hover:opacity-90 w-full sm:w-auto">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="font-serif text-sm text-muted-foreground">No credit card required • Setup in 2 minutes</p>
        </div>
      </div>
    </section>
  )
}
