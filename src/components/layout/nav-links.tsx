"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {navItems.map((item) => {
        if (item.cta) {
          return (
            <Button key={item.href} asChild variant="primary" size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          );
        }

        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-150",
              "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200",
              active
                ? "text-secondary after:w-full"
                : "text-muted-foreground hover:text-secondary after:w-0 hover:after:w-full"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
