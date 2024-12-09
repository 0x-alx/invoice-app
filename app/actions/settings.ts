"use server"

import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const settingsSchema = z.object({
  companyName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().min(4),
  country: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email(),
  vatNumber: z.string().optional(),
})

export type SettingsFormData = z.infer<typeof settingsSchema>

export async function updateSettings(data: SettingsFormData) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    const validatedData = settingsSchema.parse(data)

    await prisma.user.update({
      where: { id: user.id },
      data: validatedData,
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to update settings:", error)
    return { success: false, error: "Failed to update settings" }
  }
} 