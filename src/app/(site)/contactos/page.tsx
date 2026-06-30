import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactInfo } from "@/components/contact/contact-info";
import { MapEmbed } from "@/components/contact/map-embed";
import { QuoteForm } from "@/components/forms/quote-form";
import {
  getPrimaryLocation,
  getServiceGroups,
  toSiteSettings,
} from "@/lib/content/adapters";
import { getWebsiteContent } from "@/lib/content/website-content";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getWebsiteContent();
  return content.pages.contact.seo;
}

export default async function ContactosPage() {
  const { content } = await getWebsiteContent();
  const site = toSiteSettings(content);
  const page = content.pages.contact;
  const { allServices } = getServiceGroups(content);
  const primaryLocation = getPrimaryLocation(content);

  return (
    <>
      <PageHero {...page.hero} />

      <section className="bg-frontend-bg py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactInfo site={site} location={primaryLocation} />
          <MapEmbed
            className="min-h-80"
            src={primaryLocation.mapEmbedUrl ?? ""}
          />
        </Container>
      </section>

      <section className="bg-frontend-muted py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading {...page.formIntro} />
          </div>
          <div className="lg:col-span-7">
            <QuoteForm
              compact
              services={allServices.map(({ slug, title }) => ({ slug, title }))}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
