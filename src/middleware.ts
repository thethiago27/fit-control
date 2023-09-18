import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.get('token')

  if (!hasToken) {
    if (request.nextUrl.pathname.startsWith('/workout')) {
      return NextResponse.rewrite(new URL('/', request.url))
    }
  } else {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.rewrite(new URL('/workout', request.url))
    }
  }
}
