'use server'

import { PrismaClient } from '@prisma/client'
import { createHash } from 'crypto'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

type AuthError = {
  message: string
  field?: string
}

const hashPassword = (password: string) => {
  return createHash('sha256').update(password).digest('hex')
}

export const login = async (email: string, password: string): Promise<AuthError | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    console.log(user)
    if (!user) {
      return { message: 'Invalid credentials', field: 'email' }
    }

    const hashedPassword = hashPassword(password)
    console.log(user.password === hashedPassword)
    if (user.password !== hashedPassword) {
      return { message: 'Invalid credentials', field: 'password' }
    }
    // Create JWT token
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(SECRET_KEY)

    console.log(token)
    // Set HTTP-only cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    redirect('/invoices')
  } catch (error) {
    return { message: 'An error occurred during login' }
  }
}

export const signup = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
): Promise<AuthError | null> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { message: 'Email already exists', field: 'email' }
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

    return login(email, password)
  } catch (error) {
    return { message: 'An error occurred during signup' }
  }
} 