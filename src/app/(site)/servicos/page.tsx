import type { Metadata } from "next";

import { ServiceDetail } from "@/components/services/service-detail";
import { ServicesAccordion } from "@/components/services/services-accordion";
import { Container } from "@/components/shared/container";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { designCopy } from "@/content/design-copy";
import { pages } from "@/content/site";
import { buildPageMetadata } from "@/lib/content/metadata";
import { toService } from "@/lib/content/adapters";
import { blockAttrs, fieldAttrs, linkOf } from "@/lib/content/blocks";
import { boundServices, ctaBandOf, introOf } from "@/lib/content/bound";
import { getBlocks, getServices } from "@/lib/content/content";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(pages.services.seo);
}

export default async function ServicosPage() {
  const [blocks, services] = await Promise.all([getBlocks(), getServices()]);
  const copy = designCopy.services;

  // Bound content: the documents each block serves, else the services read here.
  // A service's tier decides which of the two sections it belongs to, so each
  // section keeps its tiers out of the documents chosen for it: the primary
  // services, then the featured ones, in full; the secondary ones in the list.
  const detailed = boundServices(blocks, "services.featured", "list") ?? services;
  const featured = [
    ...detailed.filter((service) => service.tier === "primary"),
    ...detailed.filter((service) => service.tier === "featured"),
  ].map(toService);
  const secondaryServices = (boundServices(blocks, "services.more", "list") ?? services)
    .filter((service) => service.tier === "secondary")
    .map(toService);
  const detailCta = linkOf(blocks, "services.featured", "cta", {
    label: "Reserve já",
    href: "/orcamento",
  });

  return (
    <>
      <PageHero block="services.hero" {...introOf(blocks, "services.hero", pages.services.hero)} />

      {featured.length ? (
        <section {...blockAttrs("services.featured")} className="bg-frontend-bg py-20 lg:py-28">
          <Container {...fieldAttrs("list")} className="flex flex-col gap-20 lg:gap-28">
            {featured.map((service, index) => (
              <ServiceDetail key={service.slug} service={service} index={index} cta={detailCta} />
            ))}
          </Container>
        </section>
      ) : null}

      {secondaryServices.length ? (
        <section {...blockAttrs("services.more")} className="bg-frontend-muted py-20 lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading marked {...introOf(blocks, "services.more", copy.secondaryIntro)} />
            </div>
            <div className="lg:col-span-7">
              <ServicesAccordion services={secondaryServices} />
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand block="services.cta" {...ctaBandOf(blocks, "services.cta", copy.ctaBand)} />
    </>
  );
}
