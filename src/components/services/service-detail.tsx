import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { fieldAttrs, itemAttrs } from "@/lib/content/blocks";
import { cn } from "@/lib/utils";
import type { Cta, Service } from "@/lib/content/types";

/**
 * One service of the bound collection of the block `services.featured`: the
 * document, marked by its slug, and the properties the block declares. The link
 * is the block's own field, the same under every service, so it stays unmarked.
 */
export function ServiceDetail({
  service,
  index,
  cta,
}: {
  service: Service;
  index: number;
  cta: Cta;
}) {
  const Icon = service.icon;
  const reversed = index % 2 === 1;

  return (
    <div
      id={service.slug}
      {...itemAttrs(service.slug)}
      className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      <div className={cn("flex flex-col gap-5", reversed && "lg:order-2")}>
        <span {...fieldAttrs("icon")} className="frontend-tile">
          <Icon className="size-5.5" />
        </span>
        <h3
          {...fieldAttrs("title")}
          className="frontend-display-heading frontend-display-sm text-frontend-heading"
        >
          {service.title}
        </h3>
        <p {...fieldAttrs("description")} className="frontend-copy text-[1.0625rem]">
          {service.description}
        </p>
        {service.bullets ? (
          <ul {...fieldAttrs("bullets")} className="flex flex-col gap-3">
            {service.bullets.map((bullet, position) => (
              <li
                key={position}
                className="flex items-start gap-3 font-medium text-frontend-heading"
              >
                <Check className="mt-1 size-4 shrink-0 text-frontend-brand" strokeWidth={2.5} />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          href={cta.href}
          className="frontend-small-label group mt-2 inline-flex items-center gap-2 self-start text-frontend-brand transition-colors duration-150 ease-out hover:text-frontend-brand-strong"
        >
          {cta.label}
          <ArrowRight className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </Link>
      </div>

      <div
        {...fieldAttrs("image")}
        className={cn(
          "relative aspect-4/3 overflow-hidden rounded-[28px] bg-frontend-brand-soft",
          reversed && "lg:order-1"
        )}
      >
        {service.image?.url ? (
          <Image
            src={service.image.url}
            alt={service.image.alt}
            width={service.image.width ?? 1200}
            height={service.image.height ?? 900}
            className="h-full w-full rounded-[28px] object-cover outline -outline-offset-1 outline-black/10"
          />
        ) : (
          <Icon
            aria-hidden
            strokeWidth={1}
            className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 text-frontend-brand/30"
          />
        )}
      </div>
    </div>
  );
}
