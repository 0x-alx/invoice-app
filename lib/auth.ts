import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

export async function getCurrentUser() {
  try {
    const token = cookies().get('auth-token')?.value
    if (!token) return null

    const verified = await jwtVerify(token, SECRET_KEY)
    const userId = verified.payload.userId as string

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        companyName: true,
        address: true,
        city: true,
        postalCode: true, 
        country: true,
        phone: true,
        vatNumber: true,
      }
    })

    return user
  } catch (error) {
    return null
  }
}

export type User = {
  id: string
  email: string
  name?: string
} 