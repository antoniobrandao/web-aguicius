import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/lib/content/website-types";
import { Button } from "@/components/ui/button";

export function ServiceCard({
  service,
  cta = "Reserve já",
  ctaHref = "/orcamento",
  className,
}: {
  service: Service;
  cta?: string;
  ctaHref?: string;
  className?: string;
}) {
  const Icon = service.icon;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-5 border border-border bg-card p-8 transition-colors duration-200 hover:border-primary",
        className
      )}
    >
      {service.image?.pathname ? (
        <div className="-mx-8 -mt-8 aspect-video overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/blob/${service.image.pathname}`}
            alt={service.image.alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <span className="inline-flex size-14 items-center justify-center bg-secondary text-white transition-colors duration-200 group-hover:bg-primary">
          <Icon className="size-6" />
        </span>
      )}

      <h3 className="text-lg font-bold uppercase tracking-wide text-secondary">
        {service.title}
      </h3>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.short}
      </p>

      <Button asChild variant="ghost" size="sm" className="self-start px-0">
        <Link href={ctaHref}>
          {cta}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Button>
    </article>
  );
}
