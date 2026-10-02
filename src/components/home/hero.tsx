import Link from "next/link";
import { Phone } from "lucide-react";

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
    <section className="bg-frontend-muted">
      <Container className="py-16 lg:py-24">
        <h1 className="frontend-display-heading frontend-display-xl max-w-5xl text-frontend-heading">
          {beforeHighlight}
          {highlight ? <span className="text-frontend-brand">{highlight}</span> : null}
          {afterHighlight}
        </h1>
        <p className="frontend-copy mt-7 max-w-xl text-lg lg:text-xl">{hero.description}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-4">
          <Button asChild variant="primary" size="lg">
            <Link href={copy.heroPrimaryCta.href}>{copy.heroPrimaryCta.label}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={copy.heroSecondaryCta.href}>{copy.heroSecondaryCta.label}</Link>
          </Button>

          {hasPhone ? (
            <a
              href={site.phoneHref}
              className="inline-flex h-13 items-center gap-3 px-3 text-[1.0625rem] font-semibold tabular-nums text-frontend-heading transition-colors duration-150 ease-out hover:text-frontend-brand"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-frontend-brand-soft text-frontend-brand">
                <Phone className="size-4" />
              </span>
              {site.phone}
            </a>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
