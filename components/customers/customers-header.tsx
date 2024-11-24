import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CustomersHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage your customer relationships
        </p>
      </div>
      <Button className="w-full md:w-auto">
        <Plus className="mr-2 h-4 w-4" />
        Add Customer
      </Button>
    </div>
  );
}