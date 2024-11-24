"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", newCustomers: 20, activeCustomers: 120 },
  { month: "Feb", newCustomers: 25, activeCustomers: 145 },
  { month: "Mar", newCustomers: 30, activeCustomers: 175 },
  { month: "Apr", newCustomers: 28, activeCustomers: 203 },
  { month: "May", newCustomers: 35, activeCustomers: 238 },
  { month: "Jun", newCustomers: 40, activeCustomers: 278 },
];

export function CustomerGrowth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="newCustomers" 
                name="New Customers" 
                fill="hsl(var(--chart-4))" 
              />
              <Bar 
                dataKey="activeCustomers" 
                name="Active Customers" 
                fill="hsl(var(--chart-5))" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}