import type { Service } from "@/lib/content/website-types";
import type { WebsiteContent } from "@/lib/content/website-schema";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";

export function MoreServicesSection({
  services,
  intro,
}: {
  services: Service[];
  intro: WebsiteContent["pages"]["home"]["moreServicesIntro"];
}) {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              cta="Saber mais"
              ctaHref="/servicos"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
