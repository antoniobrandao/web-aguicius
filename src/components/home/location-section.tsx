import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

import type { SiteSettings } from "@/lib/content/website-types";
import type {
  WebsiteContent,
  WebsiteLocation,
} from "@/lib/content/website-schema";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/site/ui/button";

export function LocationSection({
  site,
  location,
  intro,
}: {
  site: SiteSettings;
  location: WebsiteLocation;
  intro: WebsiteContent["pages"]["home"]["locationIntro"];
}) {
  const mapEmbedUrl = location.mapEmbedUrl ?? "about:blank";
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

          <div className="frontend-flat-card mt-10 p-8">
            <p className="frontend-small-label text-frontend-brand">
              {location.city}
            </p>
            <div className="mt-5 flex flex-col gap-4 text-frontend-heading">
              <p className="flex items-start gap-3 text-sm leading-relaxed">
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
                  className="flex items-center gap-3 text-sm transition-colors duration-150 ease-in-out hover:text-frontend-brand"
                >
                  <Phone className="size-5 shrink-0 text-frontend-brand" />
                  {site.phone}
                </a>
              ) : null}
            </div>

            <div className="mt-7 flex flex-wrap gap-4">
              <Button asChild variant="default" size="sm">
                <a
                  href={location.mapsSearchUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir no mapa
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/contactos">Contactos</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="min-h-80 overflow-hidden border border-frontend-border">
          <iframe
            title={`Mapa Aguicius ${location.city}`}
            src={mapEmbedUrl}
            className="h-full min-h-80 w-full grayscale-[0.3]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </section>
  );
}
