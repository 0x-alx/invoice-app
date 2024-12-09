'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/auth-context";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  PieChart, Settings,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
const sidebarLinks = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Reports", href: "/reports", icon: PieChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href


  const { logout } = useAuth()
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Image src='/assets/logo-light.svg' alt='Logo' width={40} height={40} />
                <ThemeToggle />
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 p-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${isActive(link.href) ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
            <Button variant="outline" className="w-full" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}