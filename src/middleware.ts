import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.get('token')

  if (!hasToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/workout/:path*'],
}
