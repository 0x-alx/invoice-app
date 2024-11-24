"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateInvoiceForm } from "./create-invoice-form";

export const InvoicesHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">
          Create and manage invoices for your customers
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          <CreateInvoiceForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};