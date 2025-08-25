import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { AuthHelpers, authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { userId, completed } = await request.json()

    // Verify that the user is updating their own onboarding status
    if (userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // Update onboarding status
    await AuthHelpers.updateUserOnboarding(userId, completed)

    return NextResponse.json({
      message: "Onboarding status updated successfully",
    })
  } catch (error) {
    console.error("Onboarding update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
