import { MapPin } from "lucide-react";

import { locations } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export function LocationsSection() {
  return (
    <section className="bg-muted py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Cobertura nacional"
          title="Onde atuamos"
          description="Presença estratégica de norte a sul do país para servir os nossos clientes com rapidez."
        />

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div key={location.city} className="flex flex-col gap-4 bg-card p-8">
              <span className="inline-flex size-12 items-center justify-center bg-primary text-white">
                <MapPin className="size-5" />
              </span>
              <h3 className="text-lg font-bold uppercase tracking-wide text-secondary">
                {location.city}
              </h3>
              <div className="text-sm leading-relaxed text-muted-foreground">
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
