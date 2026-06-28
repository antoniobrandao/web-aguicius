import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import type { SiteSettings } from "@/lib/content/website-types";
import type { WebsiteContent } from "@/lib/content/website-schema";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function Hero({
  site,
  hero,
}: {
  site: SiteSettings;
  hero: WebsiteContent["pages"]["home"]["hero"];
}) {
  const [beforeHighlight, afterHighlight] = hero.title.split(hero.highlight);

  return (
    <section className="relative overflow-hidden bg-surface-darker text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-[140px]"
      />

      <Container className="relative grid items-center gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          {/* <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            A nossa missão
          </span> */}
          <h1 className="display-heading mt-6 text-4xl sm:text-6xl lg:text-7xl">
            {beforeHighlight}
            <span className="text-primary">{hero.highlight}</span>
            {afterHighlight}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>

          <a
            href={site.phoneHref}
            className="mt-10 inline-flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
          >
            <span className="inline-flex size-10 items-center justify-center border border-white/15 text-primary">
              <Phone className="size-4" />
            </span>
            <span className="font-semibold tracking-[0.1em]">{site.phone}</span>
          </a>
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 bg-surface-dark p-8"
              >
                <span className="text-4xl font-extrabold text-white">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

