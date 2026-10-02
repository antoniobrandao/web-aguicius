import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/lib/content/types";

export function ServiceDetail({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = service.icon;
  const reversed = index % 2 === 1;

  return (
    <div
      id={service.slug}
      className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      <div className={cn("flex flex-col gap-5", reversed && "lg:order-2")}>
        <span className="frontend-tile">
          <Icon className="size-5.5" />
        </span>
        <h3 className="frontend-display-heading frontend-display-sm text-frontend-heading">
          {service.title}
        </h3>
        <p className="frontend-copy text-[1.0625rem]">{service.description}</p>
        {service.bullets ? (
          <ul className="flex flex-col gap-3">
            {service.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 font-medium text-frontend-heading"
              >
                <Check className="mt-1 size-4 shrink-0 text-frontend-brand" strokeWidth={2.5} />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          href="/orcamento"
          className="frontend-small-label group mt-2 inline-flex items-center gap-2 self-start text-frontend-brand transition-colors duration-150 ease-out hover:text-frontend-brand-strong"
        >
          Reserve já
          <ArrowRight className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </Link>
      </div>

      <div
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
