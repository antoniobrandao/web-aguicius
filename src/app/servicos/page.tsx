import type { Metadata } from "next";

import { primaryServices, installations, secondaryServices } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaBand } from "@/components/shared/cta-band";
import { ServiceDetail } from "@/components/services/service-detail";
import { ServicesAccordion } from "@/components/services/services-accordion";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Transporte de mercadorias, montagens, instalações, entregas, recolhas, mudanças e armazenamento — soluções Prime Aguicius à medida.",
};

const featured = [...primaryServices, installations];

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="O que fazemos"
        title="Serviços"
        description="De pequenos a grandes volumes, com ou sem complexidade técnica. Temos a solução para o seu negócio."
      />

      <section className="bg-background py-20 lg:py-28">
        <Container className="flex flex-col gap-20 lg:gap-28">
          {featured.map((service, index) => (
            <ServiceDetail key={service.slug} service={service} index={index} />
          ))}
        </Container>
      </section>

      <section className="bg-muted py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Mais soluções"
              title="Tudo o que precisa"
              description="Serviços complementares para cobrir cada etapa da sua logística, com a garantia Aguicius."
            />
          </div>
          <div className="lg:col-span-7">
            <ServicesAccordion services={secondaryServices} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Apoio ao cliente"
        description="Caso tenha alguma dúvida não hesite em contactar-nos. Pedido de orçamento sem compromisso."
        primary={{ label: "Pedido de orçamento", href: "/orcamento" }}
        secondary={{ label: "Contactos", href: "/contactos" }}
      />
    </>
  );
}
