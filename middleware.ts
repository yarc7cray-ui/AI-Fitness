import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public paths that don't require authentication
  const isPublicPath = pathname === "/" || 
                      pathname.startsWith("/auth/") ||
                      pathname.startsWith("/api/") ||
                      pathname.startsWith("/_next/") ||
                      pathname.startsWith("/favicon.ico") ||
                      pathname.startsWith("/manifest.json") ||
                      pathname.startsWith("/images/")

  // Since we're using client-side auth with localStorage, 
  // we can't check auth state in middleware
  // We'll handle auth redirects on the client side
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|images/).*)",
  ],
}
