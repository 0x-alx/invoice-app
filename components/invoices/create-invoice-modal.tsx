"use client";

import { getCustomers } from "@/app/actions/customers";
import { createInvoice, type InvoiceFormData } from "@/app/actions/invoices";
import { Button } from "@/components/ui/button";
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
import { Customer } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent, DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { CustomerSelect } from "./customer-select";

const formSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  invoiceNumber: z.string().min(1, "Please enter an invoice number"),
  items: z.array(
    z.object({
      description: z.string().min(1, "Please enter a description"),
      quantity: z.coerce.number().min(1, "Please enter a quantity"),
      unitPrice: z.coerce.number().min(0.01, "Please enter a unit price"),
    })
  ).min(1, "Add at least one item"),
  dueDate: z.string().min(1, "Please select a due date"),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateInvoiceModal = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      invoiceNumber: `INV-${Date.now()}`,
      items: [
        {
          description: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
      dueDate: new Date().toISOString().split('T')[0],
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await getCustomers();
      if (result.success) {
        setCustomers(result.data ?? []);
      }
    };

    fetchCustomers();
  }, []);

  const calculateTotals = (items: FormValues["items"]) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const tax = subtotal * 0.2;
    const total = subtotal + tax;

    return { subtotal, tax, total };
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const { subtotal, tax, total } = calculateTotals(data.items);

      const invoiceData: InvoiceFormData = {
        ...data,
        items: data.items.map(item => ({
          ...item,
          total: item.quantity * item.unitPrice
        })),
        subtotal,
        tax,
        total,
      };

      const result = await createInvoice(invoiceData);
      
      if (result.success) {
        form.reset({
          customerId: "",
          invoiceNumber: `INV-${Date.now()}`,
          items: [{ description: "", quantity: 1, unitPrice: 0 }],
          dueDate: new Date().toISOString().split('T')[0],
        });
        router.refresh()
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Failed to create invoice:", error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto"><Plus className="mr-2 h-4 w-4" />Create New Invoice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]"> 
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <CustomerSelect
                    customers={customers}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Line Items</FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentItems = form.getValues("items");
                  form.setValue("items", [
                    ...currentItems,
                    { description: "", quantity: 1, unitPrice: 0 },
                  ], { shouldValidate: true });
                }}
              >
                Add Line Item
              </Button>
            </div>

            {form.watch("items").map((_, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Item {index + 1}</span>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const currentItems = form.getValues("items");
                        form.setValue(
                          "items",
                          currentItems.filter((_, i) => i !== index),
                          { shouldValidate: true }
                        );
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name={`items.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter item description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              form.trigger(`items.${index}.quantity`);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.unitPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min={0}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              form.trigger(`items.${index}.unitPrice`);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

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
          <div className="flex justify-end">
            <Button 
              type="submit" 
            className="w-full" 
            disabled={!form.formState.isValid || isLoading}
          >
            {isLoading ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </form>
        </Form>
      </DialogContent>
    </Dialog> 
  );
}; 