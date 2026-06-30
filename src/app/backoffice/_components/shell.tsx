"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Globe2,
  LayoutDashboard,
  ListTree,
  LogOut,
  MapPin,
  Navigation,
  Truck,
} from "lucide-react";

import { logoutBackoffice } from "@/app/backoffice/actions";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Painel", href: "/backoffice", icon: LayoutDashboard },
  { label: "Website", href: "/backoffice/website", icon: Globe2 },
  { label: "Navegação", href: "/backoffice/navigation", icon: Navigation },
  { label: "Páginas", href: "/backoffice/pages", icon: FileText },
  { label: "Localizações", href: "/backoffice/locations", icon: MapPin },
  { label: "Serviços", href: "/backoffice/services", icon: Truck },
];

const sectionLabels = new Map(navItems.map((item) => [item.href, item.label]));

export function BackofficeSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <Logo className="max-w-28" />
          {/* <div className="min-w-0">
            <span className="block text-sm font-semibold">Backoffice</span>
            <span className="block truncate text-xs text-muted-foreground">
              Conteúdo normalizado
            </span>
          </div> */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Backoffice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <form action={logoutBackoffice} className="px-2 pb-2">
          <Button type="submit" variant="outline" className="w-full justify-start">
            <LogOut />
            Terminar sessão
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}

export function BackofficeBreadcrumb() {
  const pathname = usePathname();
  const label = sectionLabels.get(pathname) ?? "Backoffice";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/backoffice">Backoffice</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname !== "/backoffice" ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <ListTree className="size-3.5" />
        {eyebrow}
      </span>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
