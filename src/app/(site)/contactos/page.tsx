import type { Metadata } from "next";

import { ContactInfo } from "@/components/contact/contact-info";
import { MapEmbed } from "@/components/contact/map-embed";
import { QuoteForm } from "@/components/forms/quote-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { designCopy } from "@/content/design-copy";
import {
  getPrimaryLocation,
  getServiceGroups,
  toServiceOptions,
  toSiteSettings,
} from "@/lib/content/adapters";
import { getLocations, getPage, getServices, getSettings } from "@/lib/content/content";
import { toPageMetadata } from "@/lib/content/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return toPageMetadata(await getPage("contact"));
}

export default async function ContactosPage() {
  const [page, settings, services, locations] = await Promise.all([
    getPage("contact"),
    getSettings(),
    getServices(),
    getLocations(),
  ]);

  const site = toSiteSettings(settings);
  const { allServices } = getServiceGroups(services);
  const primaryLocation = getPrimaryLocation(locations);
  const copy = designCopy.contact;

  return (
    <>
      <PageHero {...page.hero} />

      <section className="bg-frontend-bg py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactInfo site={site} location={primaryLocation} />
          {primaryLocation?.mapEmbedUrl ? (
            <MapEmbed
              className="min-h-80"
              src={primaryLocation.mapEmbedUrl}
              title={`Mapa ${site.name} ${primaryLocation.city}`.trim()}
            />
          ) : null}
        </Container>
      </section>

      <section className="bg-frontend-muted py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading {...copy.formIntro} />
          </div>
          <div className="lg:col-span-7">
            <QuoteForm compact services={toServiceOptions(allServices)} />
          </div>
        </Container>
      </section>
    </>
  );
}
