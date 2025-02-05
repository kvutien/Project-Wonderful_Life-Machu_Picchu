import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname

  // Get the token from cookie
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value

  // Define paths that are considered public
  const isPublicPath = path === '/auth/login'

  if (!isLoggedIn && !isPublicPath) {
    // Redirect to login if accessing private path without authentication
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isLoggedIn && isPublicPath) {
    // Redirect to dashboard if accessing login page with authentication
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}