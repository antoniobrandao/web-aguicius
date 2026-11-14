import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

import { blockAttrs, fieldAttrs, itemAttrs } from "@/lib/content/blocks";
import type { Cta, SectionIntro, SiteLocation, SiteSettings } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/site/ui/button";

export function LocationSection({
  site,
  location,
  intro,
  mapLabel,
  cta,
}: {
  site: SiteSettings;
  location: SiteLocation;
  intro: SectionIntro;
  mapLabel: string;
  cta: Cta;
}) {
  const hasPhone = Boolean(site.phone.trim() && site.phoneHref.trim());

  return (
    <section {...blockAttrs("home.location")} className="bg-frontend-bg py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <SectionHeading
            marked
            eyebrow={intro.eyebrow}
            title={intro.title}
            description={intro.description}
          />

          <div className="frontend-card mt-10 p-8">
            {/* The bound `location` collection (one document, the primary address).
                The phone and the buttons below are the block's own fields, so they
                sit outside the document. Its two map URLs are a link target and an
                iframe source: unmarked, the preview would type the URL over them. */}
            <div {...fieldAttrs("location")}>
              <div {...itemAttrs(location.slug)}>
                <p {...fieldAttrs("city")} className="frontend-card-title">
                  {location.city}
                </p>
                <p className="mt-5 flex items-start gap-3 leading-relaxed text-frontend-heading">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-frontend-brand" />
                  <span {...fieldAttrs("lines")}>
                    {location.lines.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < location.lines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            </div>
            {hasPhone ? (
              <a
                href={site.phoneHref}
                className="mt-4 flex items-center gap-3 tabular-nums text-frontend-heading transition-colors duration-150 ease-out hover:text-frontend-brand"
              >
                <Phone className="size-5 shrink-0 text-frontend-brand" />
                <span {...fieldAttrs("phone")}>{site.phone}</span>
              </a>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-3">
              {location.mapsSearchUrl ? (
                <Button asChild variant="default" size="sm">
                  <a href={location.mapsSearchUrl} target="_blank" rel="noreferrer">
                    <span {...fieldAttrs("mapLabel")}>{mapLabel}</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline" size="sm">
                <Link {...fieldAttrs("cta")} href={cta.href}>
                  {cta.label}
                </Link>
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
