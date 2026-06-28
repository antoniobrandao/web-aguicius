"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NavItem, SiteSettings } from "@/lib/content/website-types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function MobileNav({
  items,
  site,
}: {
  items: NavItem[];
  site: SiteSettings;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Abrir menu"
          className="inline-flex size-11 items-center justify-center text-secondary transition-colors hover:text-primary lg:hidden cursor-pointer"
        >
          <Menu className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="p-8">
        <SheetTitle className="text-white">Menu</SheetTitle>
        <nav className="mt-4 flex flex-col">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "border-b border-white/10 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition-colors",
                    active ? "text-primary" : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <Button asChild variant="primary" className="w-full">
            <Link href="/orcamento" onClick={() => setOpen(false)}>
              Reserve já
            </Link>
          </Button>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <Phone className="size-4" />
            {site.phone}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
