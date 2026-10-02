"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NavItem, SiteSettings } from "@/lib/content/types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/site/ui/sheet";
import { Button } from "@/components/site/ui/button";

export function MobileNav({
  items,
  site,
}: {
  items: NavItem[];
  site: SiteSettings;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const hasPhone = Boolean(site.phone.trim() && site.phoneHref.trim());
  // The call to action gets the button at the foot of the panel rather than a row
  // in the list.
  const links = items.filter((item) => !item.cta);
  const cta = items.find((item) => item.cta);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Abrir menu"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-frontend-heading transition-colors duration-150 ease-out hover:bg-frontend-muted hover:text-frontend-brand lg:hidden"
        >
          <Menu className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="p-8">
        <SheetTitle>Menu</SheetTitle>
        <nav className="mt-2 flex flex-col">
          {links.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "border-b border-frontend-border py-4 text-lg font-semibold transition-colors duration-150 ease-out",
                    active ? "text-frontend-brand" : "text-frontend-heading hover:text-frontend-brand"
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          {cta ? (
            <Button asChild variant="primary" size="lg" className="w-full">
              <Link href={cta.href} onClick={() => setOpen(false)}>
                {cta.label}
              </Link>
            </Button>
          ) : null}
          {hasPhone ? (
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 py-2 font-semibold text-frontend-heading transition-colors duration-150 ease-out hover:text-frontend-brand"
            >
              <Phone className="size-4 text-frontend-brand" />
              {site.phone}
            </a>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
