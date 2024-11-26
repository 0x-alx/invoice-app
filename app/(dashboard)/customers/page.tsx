import { getCustomers } from "@/app/actions/customers"
import { CustomersHeader } from "@/components/customers/customers-header"
import { CustomersTable } from "@/components/customers/customers-table"
import { TableSkeleton } from "@/components/skeletons/table-skeleton"
import { Suspense } from "react"

export const revalidate = 0

export default async function CustomersPage() {
  const { data: customers, success } = await getCustomers()
  
  return (
    <div className="flex flex-col gap-5 p-6">
      <CustomersHeader />
      <Suspense fallback={<TableSkeleton />}>
        <CustomersTable customers={customers ?? []} />
      </Suspense>
    </div>
  )
}