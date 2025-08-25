import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Dumbbell, Apple, Users, Trophy, Smartphone } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Personal Coach",
    description:
      "Get personalized workout and nutrition plans powered by advanced AI that adapts to your progress and preferences.",
  },
  {
    icon: Dumbbell,
    title: "Smart Workout Plans",
    description:
      "100+ exercises with video demos, custom routines for any fitness level, and real-time form corrections.",
  },
  {
    icon: Apple,
    title: "Nutrition Tracking",
    description: "Smart meal recommendations, macro tracking, and personalized nutrition plans based on your goals.",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Join challenges, share progress, and get motivated by thousands of fitness enthusiasts worldwide.",
  },
  {
    icon: Trophy,
    title: "Gamification",
    description: "Earn badges, maintain streaks, and unlock achievements as you progress towards your fitness goals.",
  },
  {
    icon: Smartphone,
    title: "Wearable Integration",
    description: "Sync with Apple Health, Fitbit, Garmin, and other devices for comprehensive health tracking.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
            Our comprehensive platform combines AI coaching, community support, and advanced tracking to help you
            achieve your fitness goals faster than ever.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-sans text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-serif text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
