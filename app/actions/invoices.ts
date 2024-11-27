'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type InvoiceFormData = {
  customerId: string
  invoiceNumber: string
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  tax: number
  total: number
  dueDate: string
}

export const createInvoice = async (data: InvoiceFormData) => {
  try {
    const items = data.items.map(item => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.total
    }))

    const invoice = await prisma.invoice.create({
      data: {
        customerId: data.customerId,
        invoiceNumber: data.invoiceNumber,
        items: {
          create: items.map(item => ({
            ...item,
            total: item.total
          }))
        },
        subtotal: data.subtotal,
        tax: data.tax,
        total: data.total,
        dueDate: new Date(data.dueDate),
        status: "PENDING",
      }
    })

    revalidatePath("/invoices")
    return { success: true, data: invoice }
  } catch (error) {
    console.error("Failed to create invoice:", error)
    return { success: false, error: "Failed to create invoice" }
  }
} 

export const getInvoices = async () => {
  const invoices = await prisma.invoice.findMany({
    include: {
      customer: true,
    },  
  })
  return invoices
}