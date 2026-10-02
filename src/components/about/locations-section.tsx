import { MapPin } from "lucide-react";

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
    <section className="bg-frontend-bg py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div key={location.city} className="frontend-card flex flex-col gap-4 p-7">
              <span className="frontend-tile">
                <MapPin className="size-5" />
              </span>
              <h3 className="frontend-card-title">{location.city}</h3>
              <div className="frontend-copy text-[0.9375rem]">
                {location.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
