export type Invoice = {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  date: string | Date
  status: string
  description: string
  amount: number
} 