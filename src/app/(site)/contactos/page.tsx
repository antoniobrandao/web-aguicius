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
import { blockAttrs, textOf } from "@/lib/content/blocks";
import { boundLocations, boundSite, introOf } from "@/lib/content/bound";
import { getBlocks, getLocations, getSettings } from "@/lib/content/content";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(pages.contact.seo);
}

export default async function ContactosPage() {
  const [blocks, settings, locations] = await Promise.all([
    getBlocks(),
    getSettings(),
    getLocations(),
  ]);

  // Bound content: what the block serves, else the resource read here.
  const site = boundSite(toSiteSettings(settings), blocks, "contact.info");
  const servedLocations = boundLocations(blocks, "contact.info", "address");
  const primaryLocation = servedLocations ? servedLocations[0] : getPrimaryLocation(locations);
  const copy = designCopy.contact;

  return (
    <>
      <PageHero block="contact.hero" {...introOf(blocks, "contact.hero", pages.contact.hero)} />

      <section {...blockAttrs("contact.info")} className="bg-frontend-bg py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactInfo
            site={site}
            location={primaryLocation}
            labels={{
              address: textOf(blocks, "contact.info", "addressLabel", "Morada"),
              phone: textOf(blocks, "contact.info", "phoneLabel", "Telefone"),
              email: textOf(blocks, "contact.info", "emailLabel", "Email"),
              schedule: textOf(blocks, "contact.info", "scheduleLabel", "Horário"),
            }}
          />
          {primaryLocation?.mapEmbedUrl ? (
            <MapEmbed
              className="min-h-80"
              src={primaryLocation.mapEmbedUrl}
              title={`Mapa ${site.name} ${primaryLocation.city}`.trim()}
            />
          ) : null}
        </Container>
      </section>

      <section {...blockAttrs("contact.form")} className="bg-frontend-muted py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading marked {...introOf(blocks, "contact.form", copy.formIntro)} />
          </div>
          <div className="lg:col-span-7">
            <ContactForm
              submitLabel={textOf(blocks, "contact.form", "submit", copy.form.submitLabel)}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
