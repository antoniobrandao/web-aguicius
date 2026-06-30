import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaBand } from "@/components/shared/cta-band";
import { ServiceDetail } from "@/components/services/service-detail";
import { ServicesAccordion } from "@/components/services/services-accordion";
import { getServiceGroups } from "@/lib/content/adapters";
import { getWebsiteContent } from "@/lib/content/website-content";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getWebsiteContent();
  return content.pages.services.seo;
}

export default async function ServicosPage() {
  const { content } = await getWebsiteContent();
  const page = content.pages.services;
  const { primaryServices, installations, secondaryServices } =
    getServiceGroups(content);
  const featured = [...primaryServices, installations];

  return (
    <>
      <PageHero {...page.hero} />

      <section className="bg-frontend-bg py-20 lg:py-28">
        <Container className="flex flex-col gap-20 lg:gap-28">
          {featured.map((service, index) => (
            <ServiceDetail key={service.slug} service={service} index={index} />
          ))}
        </Container>
      </section>

      <section className="bg-frontend-muted py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading {...page.secondaryIntro} />
          </div>
          <div className="lg:col-span-7">
            <ServicesAccordion services={secondaryServices} />
          </div>
        </Container>
      </section>

      <CtaBand
        title={page.ctaBand.title}
        description={page.ctaBand.description}
        primary={page.ctaBand.primary}
        secondary={page.ctaBand.secondary}
      />
    </>
  );
}
