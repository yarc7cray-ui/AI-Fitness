import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const pathname = req.nextUrl.pathname

    // Public paths that don't require authentication
    const isPublicPath = pathname === "/" || 
                        pathname.startsWith("/auth/") ||
                        pathname.startsWith("/api/auth/") ||
                        pathname.startsWith("/_next/") ||
                        pathname.startsWith("/favicon.ico") ||
                        pathname.startsWith("/manifest.json") ||
                        pathname.startsWith("/images/")

    // If user is not authenticated and trying to access protected route
    if (!isAuth && !isPublicPath) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }

    // If user is authenticated but hasn't completed onboarding
    if (isAuth && token && !token.onboardingCompleted) {
      // Allow access to onboarding and auth pages
      if (pathname.startsWith("/onboarding") || 
          pathname.startsWith("/auth/") || 
          pathname.startsWith("/api/")) {
        return NextResponse.next()
      }
      
      // Redirect to onboarding for all other protected routes
      return NextResponse.redirect(new URL("/onboarding", req.url))
    }

    // If user is authenticated and has completed onboarding but tries to access auth pages
    if (isAuth && (pathname.startsWith("/auth/") || pathname === "/onboarding")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public paths without token
        const pathname = req.nextUrl.pathname
        const isPublicPath = pathname === "/" || 
                            pathname.startsWith("/auth/") ||
                            pathname.startsWith("/api/auth/") ||
                            pathname.startsWith("/_next/") ||
                            pathname.startsWith("/favicon.ico") ||
                            pathname.startsWith("/manifest.json") ||
                            pathname.startsWith("/images/")
        
        return isPublicPath || !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|manifest.json|images/).*)",
  ],
}
