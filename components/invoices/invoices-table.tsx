"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Invoice } from "@prisma/client";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400";
    case "Overdue":
      return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
  }
};

export async function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{invoice.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{invoice.customer.email}</p>
                </div>
              </TableCell>
              <TableCell>{invoice.total}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(invoice.status)} variant="secondary">
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>{invoice.createdAt.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}