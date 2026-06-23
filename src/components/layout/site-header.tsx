"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NavItem, SiteSettings } from "@/lib/site";
import { Logo } from "@/components/layout/logo";
import { NavLinks } from "@/components/layout/nav-links";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader({
  site,
  navItems,
}: {
  site: SiteSettings;
  navItems: NavItem[];
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-shadow duration-200",
        scrolled ? "border-border shadow-sm" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-(--container-page) items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Logo responsive />

        <div className="flex items-center gap-6">
          <NavLinks className="hidden lg:flex" items={navItems} />
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary xl:inline-flex"
          >
            <Phone className="size-4 text-primary" />
            {site.phone}
          </a>
          <MobileNav items={navItems} site={site} />
        </div>
      </div>
    </header>
  );
}
