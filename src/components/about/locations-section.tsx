import { MapPin } from "lucide-react";

import type { WebsiteContent, WebsiteLocation } from "@/lib/content/website-schema";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export function LocationsSection({
  locations,
  intro,
}: {
  locations: WebsiteLocation[];
  intro: WebsiteContent["pages"]["about"]["locationsIntro"];
}) {
  return (
    <section className="bg-frontend-muted py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <div className="mt-14 grid gap-px border border-frontend-border bg-frontend-border sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div key={location.city} className="flex flex-col gap-4 bg-frontend-card p-8">
              <span className="inline-flex size-12 items-center justify-center bg-frontend-brand text-white">
                <MapPin className="size-5" />
              </span>
              <h3 className="text-xl font-medium leading-7 tracking-widest text-frontend-heading">
                {location.city}
              </h3>
              <div className="frontend-copy text-sm">
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
