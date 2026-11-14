import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { fieldAttrs, itemAttrs } from "@/lib/content/blocks";
import { cn } from "@/lib/utils";
import type { Cta, Service } from "@/lib/content/types";

/**
 * One service of a bound `services` collection: the card is the document (marked
 * by its slug) and its title, summary, photograph and icon are the properties
 * the block declares. The link is the block's own field, the same on every card,
 * so it stays unmarked: a block field may not sit inside a document.
 */
export function ServiceCard({
  service,
  cta,
  className,
}: {
  service: Service;
  cta: Cta;
  className?: string;
}) {
  const Icon = service.icon;

  return (
    <article
      {...itemAttrs(service.slug)}
      className={cn(
        "frontend-card group relative flex flex-col p-3 transition-shadow duration-200 ease-out hover:shadow-frontend-card-hover",
        className
      )}
    >
      {service.image?.url ? (
        <div className="aspect-16/10 overflow-hidden rounded-xl bg-frontend-muted">
          <Image
            {...fieldAttrs("image")}
            src={service.image.url}
            alt={service.image.alt}
            width={service.image.width ?? 800}
            height={service.image.height ?? 500}
            className="h-full w-full rounded-xl object-cover outline -outline-offset-1 outline-black/10"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-5">
        {service.image?.url ? null : (
          <span {...fieldAttrs("icon")} className="frontend-tile mb-2">
            <Icon className="size-5.5" />
          </span>
        )}

        <h3 {...fieldAttrs("title")} className="frontend-card-title">
          {service.title}
        </h3>

        <p {...fieldAttrs("short")} className="frontend-copy flex-1 text-[0.9375rem]">
          {service.short}
        </p>

        {/* The link's hit area is stretched over the whole card. */}
        <Link
          href={cta.href}
          className="frontend-small-label mt-2 inline-flex items-center gap-2 self-start text-frontend-brand outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-frontend-brand/40"
        >
          {cta.label}
          <ArrowRight className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
