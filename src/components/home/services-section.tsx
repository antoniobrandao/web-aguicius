import { primaryServices } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";

export function ServicesSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="O que fazemos"
          title="Os nossos serviços"
          description="Soluções à medida para empresas e particulares, com a garantia de qualidade AGUICIUS."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {primaryServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
