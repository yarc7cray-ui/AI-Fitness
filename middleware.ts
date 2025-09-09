import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public paths that don't require special handling
  const isStatic = pathname.startsWith('/_next/') || pathname.startsWith('/images/') || pathname === '/favicon.ico' || pathname === '/manifest.json'

  // Ensure we set a deviceId cookie for guest scoping
  try {
    const hasDevice = !!request.cookies.get('deviceId')?.value
    if (!hasDevice && !isStatic) {
      const id = typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function' ? (crypto as any).randomUUID() : Math.random().toString(36).slice(2, 10)
      const res = NextResponse.next()
      // 2 years in seconds
      const twoYears = 60 * 60 * 24 * 365 * 2
      res.cookies.set({ name: 'deviceId', value: id, httpOnly: true, secure: true, path: '/', maxAge: twoYears })
      return res
    }
  } catch (err) {
    // don't block requests on cookie failures
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|images/).*)',
  ],
}
