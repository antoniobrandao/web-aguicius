import type { Metadata } from "next";

import { ContactInfo } from "@/components/contact/contact-info";
import { MapEmbed } from "@/components/contact/map-embed";
import { QuoteForm } from "@/components/forms/quote-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { designCopy } from "@/content/design-copy";
import { pages } from "@/content/site";
import { buildPageMetadata } from "@/lib/content/metadata";
import {
  getPrimaryLocation,
  getServiceGroups,
  toServiceOptions,
  toSiteSettings,
} from "@/lib/content/adapters";
import { getLocations, getServices, getSettings } from "@/lib/content/content";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(pages.contact.seo);
}

export default async function ContactosPage() {
  const [settings, services, locations] = await Promise.all([
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
      <PageHero {...pages.contact.hero} />

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
