import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { prisma } from './prisma'

type JWTPayload = {
  userId: string
  email: string
}

export type User = {
  id: string
  email: string
  lastName?: string | null
}

// Use React cache to prevent duplicate database calls
export const getCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const token = cookies().get('auth-token')?.value
    
    if (!token) {
      console.log('Auth - No token found')
      return null
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    const { payload } = await jwtVerify(token, secretKey) as { payload: JWTPayload }
    console.log('Auth - Token verified, userId:', payload.userId)

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        lastName: true,
      }
    })

    if (!user) {
      console.log('Auth - User not found in database')
      return null
    }

    console.log('Auth - User found:', user.email)
    return user
  } catch (error) {
    console.error('Auth - Error:', error)
    return null
  }
})

// Utility function to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
} 