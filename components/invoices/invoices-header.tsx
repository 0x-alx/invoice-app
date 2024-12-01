"use client";

import { useState } from "react";
import { CreateInvoiceModal } from "./create-invoice-modal";

export const InvoicesHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">
          Create and manage invoices for your customers
        </p>
      </div>
      <CreateInvoiceModal />
    </div>
  );
};