import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/api/exercises', '/api/workout', '/api/user-workout']

const isProtectedRoute = (pathname: string) =>
  protectedRoutes.some((route) => pathname.startsWith(route))

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.get('token')

  const { pathname } = request.nextUrl

  if (isProtectedRoute(pathname) && !hasToken) {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url))
  }

  if (pathname === '/workout' && !hasToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname === '/' && hasToken) {
    return NextResponse.redirect(new URL('/workout', request.url))
  }
}
