import { redirect } from "next/navigation";

import { isBackofficeAuthenticated } from "@/lib/backoffice/auth";
import { BackofficeBreadcrumb } from "@/components/backoffice/backoffice-breadcrumb";
import { BackofficeSidebar } from "@/components/backoffice/app-sidebar";
import { BackofficeThemeProvider } from "@/components/backoffice/theme-provider";
import { BackofficeThemeToggle } from "@/components/backoffice/theme-toggle";
import { BackofficeToaster } from "@/components/backoffice/backoffice-toaster";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default async function ProtectedBackofficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await isBackofficeAuthenticated())) {
    redirect("/backoffice/login");
  }

  return (
    <BackofficeThemeProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
          } as React.CSSProperties
        }
      >
        <BackofficeSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-sm">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <div className="min-w-0 flex-1">
              <BackofficeBreadcrumb />
            </div>
            <BackofficeThemeToggle />
          </header>
          <main className="flex-1 bg-muted/40 p-4 md:p-6">{children}</main>
          <BackofficeToaster />
        </SidebarInset>
      </SidebarProvider>
    </BackofficeThemeProvider>
  );
}
