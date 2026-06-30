import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/lib/content/website-types";
import { Button } from "@/components/site/ui/button";

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
      className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div className={cn("flex flex-col gap-6", reversed && "lg:order-2")}>
        <div className="flex items-center gap-4">
          <span className="inline-flex size-14 items-center justify-center bg-frontend-brand text-white">
            <Icon className="size-6" />
          </span>
          <span className="text-sm font-medium text-frontend-border">
            0{index + 1}
          </span>
        </div>
        <h3 className="frontend-display-heading text-2xl text-frontend-heading sm:text-3xl">
          {service.title}
        </h3>
        <p className="frontend-copy">
          {service.description}
        </p>
        {service.bullets ? (
          <ul className="flex flex-col gap-3">
            {service.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 text-sm font-medium text-frontend-heading"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-frontend-brand" />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
        <Button asChild variant="ghost" size="sm" className="self-start px-0">
          <Link href="/orcamento">
            Reserve já
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div
        className={cn(
          "relative aspect-4/3 overflow-hidden border border-frontend-border bg-frontend-surface",
          reversed && "lg:order-1"
        )}
      >
        {service.image?.pathname ? (
          <Image
            src={`/api/blob/${service.image.pathname}`}
            alt={service.image.alt}
            width={service.image.width ?? 1200}
            height={service.image.height ?? 900}
            className="h-full w-full object-cover outline -outline-offset-1 outline-black/10"
          />
        ) : (
          <>
            <ImageIcon className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 text-white/10" />
          </>
        )}
      </div>
    </div>
  );
}
