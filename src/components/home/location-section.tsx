import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

import type { SectionIntro, SiteLocation, SiteSettings } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/site/ui/button";

export function LocationSection({
  site,
  location,
  intro,
}: {
  site: SiteSettings;
  location: SiteLocation;
  intro: SectionIntro;
}) {
  const hasPhone = Boolean(site.phone.trim() && site.phoneHref.trim());

  return (
    <section className="bg-frontend-bg py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow={intro.eyebrow}
            title={intro.title}
            description={intro.description}
          />

          <div className="frontend-card mt-10 p-8">
            <p className="frontend-card-title">{location.city}</p>
            <div className="mt-5 flex flex-col gap-4 text-frontend-heading">
              <p className="flex items-start gap-3 leading-relaxed">
                <MapPin className="mt-0.5 size-5 shrink-0 text-frontend-brand" />
                <span>
                  {location.lines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < location.lines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </span>
              </p>
              {hasPhone ? (
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 tabular-nums transition-colors duration-150 ease-out hover:text-frontend-brand"
                >
                  <Phone className="size-5 shrink-0 text-frontend-brand" />
                  {site.phone}
                </a>
              ) : null}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {location.mapsSearchUrl ? (
                <Button asChild variant="default" size="sm">
                  <a href={location.mapsSearchUrl} target="_blank" rel="noreferrer">
                    Abrir no mapa
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline" size="sm">
                <Link href="/contactos">Contactos</Link>
              </Button>
            </div>
          </div>
        </div>

        {location.mapEmbedUrl ? (
          <div className="min-h-80 overflow-hidden rounded-3xl shadow-frontend-card">
            <iframe
              title={`Mapa ${site.name} ${location.city}`.trim()}
              src={location.mapEmbedUrl}
              className="h-full min-h-80 w-full grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
