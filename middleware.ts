import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|public|login|signup).*)',
  ],
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/assets')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('auth-token')?.value
  console.log('Middleware - Path:', request.nextUrl.pathname)
  console.log('Middleware - Token exists:', !!token)

  if (!token) {
    console.log('Middleware - No token, redirecting to login')
    return redirectToLogin(request)
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    await jwtVerify(token, secretKey)
    console.log('Middleware - Token verified successfully')
    return NextResponse.next()
  } catch (error) {
    console.log('Middleware - Token verification failed:', error)
    return redirectToLogin(request)
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('callbackUrl', request.url)
  return NextResponse.redirect(loginUrl)
} 