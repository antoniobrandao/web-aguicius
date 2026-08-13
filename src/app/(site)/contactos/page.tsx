import type { Metadata } from "next";

import { ContactInfo } from "@/components/contact/contact-info";
import { MapEmbed } from "@/components/contact/map-embed";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { designCopy } from "@/content/design-copy";
import { pages } from "@/content/site";
import { buildPageMetadata } from "@/lib/content/metadata";
import { getPrimaryLocation, toSiteSettings } from "@/lib/content/adapters";
import { getLocations, getSettings } from "@/lib/content/content";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(pages.contact.seo);
}

export default async function ContactosPage() {
  const [settings, locations] = await Promise.all([getSettings(), getLocations()]);

  const site = toSiteSettings(settings);
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
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
