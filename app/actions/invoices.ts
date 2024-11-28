'use server'

import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { InvoiceStatus } from "@prisma/client"
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
  console.log(InvoiceStatus)
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
        status: InvoiceStatus.pending,
      }
    })

    revalidatePath("/invoices")
    return { success: true, data: invoice }
  } catch (error) {
    console.error("Failed to create invoice:", error)
    return { success: false, error: "Failed to create invoice" }
  }
}

export const getInvoicesByUserId = async () => {
  const session = await getCurrentUser()

  if (!session) {
    throw new Error("Unauthorized")
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      customer: {
        userId: session.id
      }
    },
    include: {
      customer: true,
      items: true
    },
  })
  return invoices
}

export const getInvoiceById = async (id: string) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id },
  })
  return invoice
}

export const deleteInvoice = async (id: string) => {
  try {
    // Supprimer d'abord tous les éléments de la facture
    await prisma.invoiceItem.deleteMany({
      where: {
        invoiceId: id
      }
    })

    // Ensuite, supprimer la facture
    await prisma.invoice.delete({
      where: { id },
    })

    revalidatePath("/invoices")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete invoice:", error)
    return { success: false, error: "Failed to delete invoice" }
  }
}