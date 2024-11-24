export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { createHash } from 'crypto'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

const hashPassword = (password: string) => {
  return createHash('sha256').update(password).digest('hex')
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    console.log(email, password)
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const hashedPassword = hashPassword(password)
    if (user.password !== hashedPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await new SignJWT({ 
      userId: user.id,
      email: user.email 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(SECRET_KEY)

    // Set HTTP-only cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
} 