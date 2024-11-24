import { InvoicesHeader } from "@/components/invoices/invoices-header";
import { InvoicesTable } from "@/components/invoices/invoices-table";

export default function InvoicesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <InvoicesHeader />
      <InvoicesTable />
    </div>
  );
}