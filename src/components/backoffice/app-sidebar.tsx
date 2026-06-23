"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Home, Layers, LogOut, Settings } from "lucide-react";

import { logoutBackoffice } from "@/app/backoffice/actions";
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

const items = [
  { title: "Painel", href: "/backoffice", icon: Home },
  { title: "Serviços", href: "/backoffice/servicos", icon: Layers },
  { title: "Páginas", href: "/backoffice/paginas", icon: FileText },
  { title: "Definições", href: "/backoffice/definicoes", icon: Settings },
];

export function BackofficeSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex flex-col gap-1 px-2 py-3">
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
            Aguicius
          </span>
          <span className="text-xs text-muted-foreground">Backoffice</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conteúdo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
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
        <form action={logoutBackoffice}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton type="submit">
                <LogOut />
                <span>Terminar sessão</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
