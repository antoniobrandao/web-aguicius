import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import type { Cta, SiteSettings } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/site/ui/button";

export function Hero({
  site,
  hero,
  copy,
}: {
  site: SiteSettings;
  hero: { eyebrow: string; title: string; description: string };
  copy: {
    heroHighlight: string;
    heroPrimaryCta: Cta;
    heroSecondaryCta: Cta;
    heroStats: { value: string; label: string }[];
  };
}) {
  // The headline is authored in the dashboard; the design renders one fragment of
  // it in the accent colour. An empty or absent fragment must not split the title.
  const highlight =
    copy.heroHighlight && hero.title.includes(copy.heroHighlight) ? copy.heroHighlight : "";
  const [beforeHighlight, afterHighlight] = highlight
    ? hero.title.split(highlight)
    : [hero.title, ""];
  const hasPhone = Boolean(site.phone.trim() && site.phoneHref.trim());

  return (
    <section className="bg-frontend-surface-dark text-white">
      <Container className="grid items-center gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          <h1 className="frontend-display-heading mt-6 text-4xl sm:text-6xl lg:text-7xl">
            {beforeHighlight}
            {highlight ? <span className="text-frontend-brand">{highlight}</span> : null}
            {afterHighlight}
          </h1>
          <p className="frontend-copy mt-7 max-w-xl text-white/70">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href={copy.heroPrimaryCta.href}>
                {copy.heroPrimaryCta.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href={copy.heroSecondaryCta.href}>{copy.heroSecondaryCta.label}</Link>
            </Button>
          </div>

          {hasPhone ? (
            <a
              href={site.phoneHref}
              className="mt-10 inline-flex items-center gap-3 text-sm text-white/60 transition-colors duration-150 ease-in-out hover:text-white"
            >
              <span className="inline-flex size-10 items-center justify-center border border-white/15 text-frontend-brand">
                <Phone className="size-4" />
              </span>
              <span className="font-medium tracking-widest">{site.phone}</span>
            </a>
          ) : null}
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
            {copy.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 bg-frontend-surface p-8"
              >
                <span className="text-4xl font-medium text-white">
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

