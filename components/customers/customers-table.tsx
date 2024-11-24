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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const customers = [
  {
    id: "CUST001",
    name: "Alex Thompson",
    email: "alex@example.com",
    totalSpent: "$12,499.00",
    invoices: 8,
    lastInvoice: "Mar 12, 2024",
    status: "Active",
  },
  {
    id: "CUST002",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    totalSpent: "$9,999.00",
    invoices: 6,
    lastInvoice: "Mar 11, 2024",
    status: "Active",
  },
  {
    id: "CUST003",
    name: "Michael Chen",
    email: "michael@example.com",
    totalSpent: "$8,499.00",
    invoices: 5,
    lastInvoice: "Mar 10, 2024",
    status: "Active",
  },
  {
    id: "CUST004",
    name: "Emma Davis",
    email: "emma@example.com",
    totalSpent: "$7,999.00",
    invoices: 4,
    lastInvoice: "Mar 09, 2024",
    status: "Inactive",
  },
  {
    id: "CUST005",
    name: "James Wilson",
    email: "james@example.com",
    totalSpent: "$6,499.00",
    invoices: 3,
    lastInvoice: "Mar 08, 2024",
    status: "Active",
  },
];

export function CustomersTable() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Invoices</TableHead>
            <TableHead>Last Invoice</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${customer.email}`}
                      alt={customer.name}
                    />
                    <AvatarFallback>
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {customer.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{customer.totalSpent}</TableCell>
              <TableCell>{customer.invoices}</TableCell>
              <TableCell>{customer.lastInvoice}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    customer.status === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
                  }`}
                >
                  {customer.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}