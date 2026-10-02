import type { SectionIntro, Service } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";

export function ServicesSection({
  services,
  intro,
}: {
  services: Service[];
  intro: SectionIntro;
}) {
  return (
    // Short at the foot: the quote panel that follows brings its own spacing.
    <section className="bg-frontend-bg pb-10 pt-20 lg:pb-14 lg:pt-28">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
