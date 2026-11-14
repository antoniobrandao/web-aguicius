import { MapPin } from "lucide-react";

import { blockAttrs, fieldAttrs, itemAttrs } from "@/lib/content/blocks";
import type { SectionIntro, SiteLocation } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export function LocationsSection({
  locations,
  intro,
}: {
  locations: SiteLocation[];
  intro: SectionIntro;
}) {
  return (
    <section {...blockAttrs("about.locations")} className="bg-frontend-bg py-20 lg:py-28">
      <Container>
        <SectionHeading
          marked
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <div {...fieldAttrs("list")} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div
              key={location.slug}
              {...itemAttrs(location.slug)}
              className="frontend-card flex flex-col gap-4 p-7"
            >
              <span className="frontend-tile">
                <MapPin className="size-5" />
              </span>
              <h3 {...fieldAttrs("city")} className="frontend-card-title">
                {location.city}
              </h3>
              <div {...fieldAttrs("lines")} className="frontend-copy text-[0.9375rem]">
                {location.lines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
