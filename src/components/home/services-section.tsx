import { blockAttrs, fieldAttrs } from "@/lib/content/blocks";
import type { Cta, SectionIntro, Service } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";

export function ServicesSection({
  services,
  intro,
  cta,
}: {
  services: Service[];
  intro: SectionIntro;
  cta: Cta;
}) {
  return (
    // Short at the foot: the quote panel that follows brings its own spacing.
    <section
      {...blockAttrs("home.services")}
      className="bg-frontend-bg pb-10 pt-20 lg:pb-14 lg:pt-28"
    >
      <Container>
        <SectionHeading
          marked
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <div {...fieldAttrs("list")} className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} cta={cta} />
          ))}
        </div>
      </Container>
    </section>
  );
}
