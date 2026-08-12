import type { Metadata } from "next";

import { ServiceDetail } from "@/components/services/service-detail";
import { ServicesAccordion } from "@/components/services/services-accordion";
import { Container } from "@/components/shared/container";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { designCopy } from "@/content/design-copy";
import { pages } from "@/content/site";
import { getServiceGroups } from "@/lib/content/adapters";
import { getServices } from "@/lib/content/content";

export const metadata: Metadata = pages.services.seo;

export default async function ServicosPage() {
  const [services] = await Promise.all([ getServices()]);
  const { primaryServices, featuredService, secondaryServices } = getServiceGroups(services);
  const copy = designCopy.services;
  const featured = featuredService ? [...primaryServices, featuredService] : primaryServices;

  return (
    <>
      <PageHero {...pages.services.hero} />

      {featured.length ? (
        <section className="bg-frontend-bg py-20 lg:py-28">
          <Container className="flex flex-col gap-20 lg:gap-28">
            {featured.map((service, index) => (
              <ServiceDetail key={service.slug} service={service} index={index} />
            ))}
          </Container>
        </section>
      ) : null}

      {secondaryServices.length ? (
        <section className="bg-frontend-muted py-20 lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading {...copy.secondaryIntro} />
            </div>
            <div className="lg:col-span-7">
              <ServicesAccordion services={secondaryServices} />
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title={copy.ctaBand.title}
        description={copy.ctaBand.description}
        primary={copy.ctaBand.primary}
        secondary={copy.ctaBand.secondary}
      />
    </>
  );
}
