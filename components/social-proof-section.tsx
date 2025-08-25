import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Lost 25 lbs in 3 months",
    content:
      "The AI coach understood my busy schedule and created workouts I could actually stick to. The community support kept me motivated every day!",
    avatar: "/professional-woman-smiling-fitness-testimonial.png",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Gained 15 lbs muscle",
    content:
      "As a beginner, I was intimidated by the gym. Coach Online guided me through every exercise with perfect form corrections. Game changer!",
    avatar: "/athletic-man-smiling-fitness-testimonial.png",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Marathon finisher",
    content:
      "The nutrition tracking and meal planning features helped me fuel my training properly. Completed my first marathon thanks to this platform!",
    avatar: "/runner-woman-smiling-fitness-testimonial.png",
    rating: 5,
  },
]

const stats = [
  { value: "500K+", label: "Active Users" },
  { value: "2M+", label: "Workouts Completed" },
  { value: "95%", label: "Goal Achievement Rate" },
  { value: "4.9/5", label: "User Rating" },
]

export function SocialProofSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-sans text-3xl font-bold text-foreground lg:text-4xl">{stat.value}</div>
              <div className="mt-2 font-serif text-sm text-muted-foreground lg:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by <span className="gradient-text">Fitness Enthusiasts</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
            Join thousands of people who have transformed their lives with Coach Online
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-serif text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-sans font-semibold text-foreground">{testimonial.name}</div>
                    <div className="font-serif text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
