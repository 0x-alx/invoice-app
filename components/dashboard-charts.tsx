"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, FileText, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    icon: DollarSign,
    trend: "+20.1%",
    description: "from last month",
  },
  {
    title: "Active Customers",
    value: "2,345",
    icon: Users,
    trend: "+15.1%",
    description: "from last month",
  },
  {
    title: "Pending Invoices",
    value: "12",
    icon: FileText,
    trend: "-2.1%",
    description: "from last month",
  },
  {
    title: "Growth Rate",
    value: "23.1%",
    icon: TrendingUp,
    trend: "+4.3%",
    description: "from last month",
  },
];

export function DashboardCharts() {
  return (
    <>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.trend.startsWith("+") ? "text-green-500" : "text-red-500"}>
                  {stat.trend}
                </span>
                {" "}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}