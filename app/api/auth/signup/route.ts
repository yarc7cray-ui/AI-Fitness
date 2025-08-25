import { NextRequest, NextResponse } from "next/server"
import { AuthHelpers } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    // Create user
    const user = await AuthHelpers.createUser(email, password, name)

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        onboardingCompleted: user.onboardingCompleted,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    
    if (error instanceof Error) {
      if (error.message === "User already exists") {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        )
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
