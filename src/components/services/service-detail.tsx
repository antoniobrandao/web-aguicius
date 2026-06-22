import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/lib/site";
import { Button } from "@/components/ui/button";

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
          <span className="inline-flex size-14 items-center justify-center bg-primary text-white">
            <Icon className="size-6" />
          </span>
          <span className="text-sm font-extrabold text-border">
            0{index + 1}
          </span>
        </div>
        <h3 className="display-heading text-2xl text-secondary sm:text-3xl">
          {service.title}
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        {service.bullets ? (
          <ul className="flex flex-col gap-3">
            {service.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 text-sm font-medium text-secondary"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
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
          "relative aspect-4/3 overflow-hidden border border-border bg-surface-dark",
          reversed && "lg:order-1"
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <Icon className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 text-white/10" />
        <span className="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Serviço Prime Aguicius
        </span>
      </div>
    </div>
  );
}
