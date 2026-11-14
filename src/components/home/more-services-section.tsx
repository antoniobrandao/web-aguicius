import { blockAttrs, fieldAttrs } from "@/lib/content/blocks";
import type { Cta, SectionIntro, Service } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";

export function MoreServicesSection({
  services,
  intro,
  cta,
}: {
  services: Service[];
  intro: SectionIntro;
  cta: Cta;
}) {
  return (
    <section
      {...blockAttrs("home.more-services")}
      className="bg-frontend-bg py-20 lg:py-28"
    >
      <Container>
        <SectionHeading
          marked
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <div {...fieldAttrs("list")} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} cta={cta} />
          ))}
        </div>
      </Container>
    </section>
  );
}
