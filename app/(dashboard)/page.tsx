import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardCharts } from "@/components/dashboard-charts";
import { RecentInvoices } from "@/components/recent-invoices";
import { TopCustomers } from "@/components/top-customers";

export default function Home() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCharts />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <RecentInvoices className="col-span-1 md:col-span-1 lg:col-span-4" />
        <TopCustomers className="col-span-1 md:col-span-1 lg:col-span-3" />
      </div>
    </div>
  );
}