import { redirect } from "next/navigation";

import { isBackofficeAuthenticated } from "@/lib/backoffice/auth";
import { BackofficeSidebar } from "@/components/backoffice/app-sidebar";
import { BackofficeThemeProvider } from "@/components/backoffice/theme-provider";
import { BackofficeThemeToggle } from "@/components/backoffice/theme-toggle";
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
          <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Backoffice</p>
              <p className="text-xs text-muted-foreground">
                Gestão de conteúdos do website
              </p>
            </div>
            <BackofficeThemeToggle />
          </header>
          <main className="flex-1 bg-muted/40 p-4 md:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </BackofficeThemeProvider>
  );
}
