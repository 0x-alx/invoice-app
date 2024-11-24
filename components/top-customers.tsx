import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const topCustomers = [
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    spent: "$12,499.00",
    invoices: 8,
  },
  {
    name: "Alex Thompson",
    email: "alex@example.com",
    spent: "$9,999.00",
    invoices: 6,
  },
  {
    name: "Michael Chen",
    email: "michael@example.com",
    spent: "$8,499.00",
    invoices: 5,
  },
  {
    name: "Emma Davis",
    email: "emma@example.com",
    spent: "$7,999.00",
    invoices: 4,
  },
];

interface TopCustomersProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TopCustomers({ className, ...props }: TopCustomersProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Top Customers</CardTitle>
        <CardDescription>Your most valuable customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {topCustomers.map((customer) => (
            <div key={customer.email} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://avatar.vercel.sh/${customer.email}`} alt={customer.name} />
                <AvatarFallback>{customer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{customer.name}</p>
                <p className="text-sm text-muted-foreground">{customer.invoices} invoices</p>
              </div>
              <div className="ml-auto font-medium">
                {customer.spent}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}