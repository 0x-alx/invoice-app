import { CreateCustomerModal } from "./create-customer-modal";

export const CustomersHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage your customer relationships
        </p>
      </div>
      <CreateCustomerModal />
    </div>
  );
}