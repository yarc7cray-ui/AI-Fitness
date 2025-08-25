import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Coach Online - Your AI Fitness Coach",
  description: "Train Smarter, Live Stronger with AI-powered workouts, nutrition planning, and community support",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
