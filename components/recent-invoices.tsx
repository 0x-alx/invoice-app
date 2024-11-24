import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const recentInvoices = [
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
];

interface RecentInvoicesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentInvoices({ className, ...props }: RecentInvoicesProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription>
          Latest transactions from your customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://avatar.vercel.sh/${invoice.email}`} alt={invoice.customer} />
                <AvatarFallback>{invoice.customer.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{invoice.customer}</p>
                <p className="text-sm text-muted-foreground">{invoice.email}</p>
              </div>
              <div className="ml-auto font-medium">
                <div className="text-right">
                  <p className="text-sm font-medium">{invoice.amount}</p>
                  <p className={`text-xs ${
                    invoice.status === "Paid" 
                      ? "text-green-500" 
                      : invoice.status === "Pending" 
                      ? "text-yellow-500" 
                      : "text-red-500"
                  }`}>
                    {invoice.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}