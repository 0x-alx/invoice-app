import { CustomersHeader } from "@/components/customers/customers-header";
import { CustomersTable } from "@/components/customers/customers-table";

export default function CustomersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <CustomersHeader />
      <CustomersTable />
    </div>
  );
}