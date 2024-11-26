'use server'

import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { InvoiceStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export type InvoiceItemData = {
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export type InvoiceFormData = {
  invoiceNumber: string
  status?: InvoiceStatus
  dueDate: Date
  subtotal: number
  tax: number
  total: number
  notes?: string
  terms?: string
  customerId: string
  items: InvoiceItemData[]
}

export async function getInvoices() {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    return await prisma.invoice.findMany({
      where: {
        customer: {
          userId: user.id
        }
      },
      include: {
        customer: true,
        items: true
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    throw new Error('Failed to fetch invoices')
  }
}

export async function getInvoice(id: string) {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const invoice = await prisma.invoice.findFirst({
      where: {
        id,
        customer: {
          userId: user.id
        }
      },
      include: {
        customer: true,
        items: true
      }
    })

    if (!invoice) throw new Error('Invoice not found')
    return invoice
  } catch (error) {
    throw new Error('Failed to fetch invoice')
  }
}

export async function createInvoice(data: InvoiceFormData) {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    // Verify customer belongs to user
    const customer = await prisma.customer.findUnique({
      where: { 
        id: data.customerId,
        userId: user.id
      }
    })

    if (!customer) throw new Error('Customer not found')

    const invoice = await prisma.invoice.create({
      data: {
        ...data,
        items: {
          create: data.items
        }
      },
      include: {
        items: true,
        customer: true
      }
    })

    revalidatePath('/invoices')
    return invoice
  } catch (error) {
    throw new Error('Failed to create invoice')
  }
}

export async function updateInvoice(id: string, data: Partial<InvoiceFormData>) {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const { items, ...invoiceData } = data

    const invoice = await prisma.invoice.update({
      where: { id },
      data: {
        ...invoiceData,
        items: items ? {
          deleteMany: {},
          create: items
        } : undefined
      },
      include: {
        items: true,
        customer: true
      }
    })

    revalidatePath('/invoices')
    revalidatePath(`/invoices/${id}`)
    return invoice
  } catch (error) {
    throw new Error('Failed to update invoice')
  }
}

export async function deleteInvoice(id: string) {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    await prisma.invoice.delete({
      where: { id }
    })

    revalidatePath('/invoices')
    return { success: true }
  } catch (error) {
    throw new Error('Failed to delete invoice')
  }
} 