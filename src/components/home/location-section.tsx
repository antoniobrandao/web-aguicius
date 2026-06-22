import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Rua+do+Capit%C3%A3o+88+Carvalhal+Portugal";

export function LocationSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow="Onde estamos"
            title="A nossa localização"
            description="Visite-nos ou contacte-nos. Estamos disponíveis para encontrar a melhor solução para si."
          />

          <div className="mt-10 border border-border bg-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Barcelos
            </p>
            <div className="mt-5 flex flex-col gap-4 text-secondary">
              <p className="flex items-start gap-3 text-sm leading-relaxed">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  {site.address.street},<br />
                  {site.address.zip}
                </span>
              </p>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
              >
                <Phone className="size-5 shrink-0 text-primary" />
                {site.phone}
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-4">
              <Button asChild variant="default" size="sm">
                <a href={mapsUrl} target="_blank" rel="noreferrer">
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

        <div className="min-h-80 overflow-hidden border border-border">
          <iframe
            title="Mapa Aguicius Barcelos"
            src="https://www.google.com/maps?q=Rua%20do%20Capit%C3%A3o%2088%20Carvalhal%20Portugal&output=embed"
            className="h-full min-h-80 w-full grayscale-[0.3]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </section>
  );
}
