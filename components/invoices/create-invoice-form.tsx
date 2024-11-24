"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomerSelect } from "./customer-select";

export const CUSTOMERS = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "Globex Corporation" },
  { id: "3", name: "Soylent Corp" },
];

const formSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount"),
  dueDate: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateInvoiceForm = () => {
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      amount: "",
      dueDate: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <CustomerSelect
                    customers={CUSTOMERS}
                    value={field.value}
                    onValueChange={field.onChange}
                    onAddNewClick={() => setIsAddingCustomer(true)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter amount"
                    type="number"
                    step="0.01"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Invoice
          </Button>
        </form>
      </Form>

      <Dialog open={isAddingCustomer} onOpenChange={setIsAddingCustomer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Customer name" />
            <Button
              className="w-full"
              onClick={() => setIsAddingCustomer(false)}
            >
              Add Customer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}; 