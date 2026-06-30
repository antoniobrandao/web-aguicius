import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/lib/content/website-types";
import { Button } from "@/components/site/ui/button";

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
        "frontend-flat-card group relative flex flex-col gap-5 p-8 transition-colors duration-150 ease-in-out hover:border-frontend-brand",
        className
      )}
    >
      {service.image?.pathname ? (
        <div className="-mx-8 -mt-8 aspect-video overflow-hidden bg-frontend-muted">
          <Image
            src={`/api/blob/${service.image.pathname}`}
            alt={service.image.alt}
            width={service.image.width ?? 800}
            height={service.image.height ?? 450}
            className="h-full w-full object-cover outline -outline-offset-1 outline-black/10"
          />
        </div>
      ) : (
        <span className="inline-flex size-14 items-center justify-center bg-frontend-surface text-white transition-colors duration-150 ease-in-out group-hover:bg-frontend-brand">
          <Icon className="size-6" />
        </span>
      )}

      <h3 className="text-xl font-medium leading-7 tracking-widest text-frontend-heading">
        {service.title}
      </h3>

      <p className="frontend-copy flex-1 text-sm">
        {service.short}
      </p>

      <Button asChild variant="ghost" size="sm" className="self-start px-0">
        <Link href={ctaHref}>
          {cta}
          <ArrowRight className="size-4 transition-transform duration-150 ease-in-out group-hover:translate-x-1" />
        </Link>
      </Button>
    </article>
  );
}
