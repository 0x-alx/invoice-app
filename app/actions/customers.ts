"use server"

import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
})

export async function createCustomer(formData: z.infer<typeof customerSchema>) {
  try {
    const session = await getCurrentUser()
    
    if (!session) {
      throw new Error("Unauthorized")
    }

    const validatedFields = customerSchema.parse(formData)

    const customer = await prisma.customer.create({
      data: {
        ...validatedFields,
        user: { connect: { id: session.id } },
      },
    })

    return { success: true, data: customer }
  } catch (error) {
    console.error("[CREATE_CUSTOMER_ERROR]", error)
    return { success: false, error: "Failed to create customer" }
  }
}

export async function getCustomers() {
  try {
    const session = await getCurrentUser()
    
    if (!session) {
      throw new Error("Unauthorized")
    }

    const customers = await prisma.customer.findMany({
      where: {
        userId: session.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, data: customers }
  } catch (error) {
    console.error("[GET_CUSTOMERS_ERROR]", error)
    return { success: false, error: "Failed to fetch customers" }
  }
} 