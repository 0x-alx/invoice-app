"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const invoices = [
  {
    id: "INV001",
    customer: "Alex Thompson",
    email: "alex@example.com",
    amount: "$1,999.00",
    status: "Paid",
    date: "Mar 12, 2024",
  },
  {
    id: "INV002",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    amount: "$1,499.00",
    status: "Pending",
    date: "Mar 11, 2024",
  },
  {
    id: "INV003",
    customer: "Michael Chen",
    email: "michael@example.com",
    amount: "$2,999.00",
    status: "Paid",
    date: "Mar 10, 2024",
  },
  {
    id: "INV004",
    customer: "Emma Davis",
    email: "emma@example.com",
    amount: "$999.00",
    status: "Overdue",
    date: "Mar 09, 2024",
  },
  {
    id: "INV005",
    customer: "James Wilson",
    email: "james@example.com",
    amount: "$2,499.00",
    status: "Paid",
    date: "Mar 08, 2024",
  },
];

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

export function InvoicesTable() {
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
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{invoice.customer}</p>
                  <p className="text-sm text-muted-foreground">{invoice.email}</p>
                </div>
              </TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(invoice.status)} variant="secondary">
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>{invoice.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}