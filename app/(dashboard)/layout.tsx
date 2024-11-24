import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { getCurrentUser } from '@/lib/auth';
import { Loader2 } from 'lucide-react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice Dashboard",
  description: "Modern invoice management system",
};

async function AuthCheck() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return null
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <AuthCheck />
        </Suspense>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background">
              <Suspense fallback={<Loader2 className="animate-spin" />}>
                {children}
              </Suspense>
            </main>
          </div>
        </ThemeProvider>
    </>
  );
}