import { prisma } from '@/lib/prisma'
import { createHash } from 'crypto'
import { NextResponse } from 'next/server'

const hashPassword = (password: string) => {
  return createHash('sha256').update(password).digest('hex')
}

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = hashPassword(password)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName
      }
    })

    // Redirect to login API
    const loginResponse = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    return loginResponse
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    )
  }
} 