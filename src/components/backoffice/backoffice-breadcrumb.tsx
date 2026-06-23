"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const sectionLabels: Record<string, string> = {
  "/backoffice": "Painel",
  "/backoffice/servicos": "Serviços",
  "/backoffice/paginas": "Páginas",
  "/backoffice/definicoes": "Definições",
};

export function BackofficeBreadcrumb() {
  const pathname = usePathname();
  const current = sectionLabels[pathname] ?? "Painel";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-muted-foreground">
          Backoffice
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
