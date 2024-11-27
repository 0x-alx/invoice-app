import { getInvoices } from "@/app/actions/invoices";
import { InvoicesHeader } from "@/components/invoices/invoices-header";
import { InvoicesTable } from "@/components/invoices/invoices-table";

export default async function InvoicesPage() {
  const invoices = await getInvoices()

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <InvoicesHeader />
      <InvoicesTable invoices={invoices} />
    </div>
  );
}