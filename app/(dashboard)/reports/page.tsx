import { ReportsHeader } from "@/components/reports/reports-header";
import { RevenueChart } from "@/components/reports/revenue-chart";
import { InvoiceStats } from "@/components/reports/invoice-stats";
import { CustomerGrowth } from "@/components/reports/customer-growth";

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <ReportsHeader />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <InvoiceStats className="lg:col-span-1" />
        <RevenueChart className="md:col-span-2 lg:col-span-2" />
      </div>
      <CustomerGrowth />
    </div>
  );
}