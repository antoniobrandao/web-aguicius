import { secondaryServices } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";

export function MoreServicesSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Mais soluções"
          title="Tudo o que precisa, num só lugar"
          description="Do armazenamento às entregas express, cobrimos todas as etapas da sua logística."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {secondaryServices.map((service) => (
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
