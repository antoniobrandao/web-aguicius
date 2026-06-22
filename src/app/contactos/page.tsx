import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactInfo } from "@/components/contact/contact-info";
import { MapEmbed } from "@/components/contact/map-embed";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Fale com a Aguicius. Morada em Barcelos, telefone, email e horário de funcionamento.",
};

export default function ContactosPage() {
  return (
    <>
      <PageHero
        eyebrow="Fale connosco"
        title="Contactos"
        description="Estamos disponíveis para encontrar a melhor solução para si. Entre em contacto."
      />

      <section className="bg-background py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactInfo />
          <MapEmbed className="min-h-80" />
        </Container>
      </section>

      <section className="bg-muted py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Apoio ao cliente"
              title="Envie-nos uma mensagem"
              description="Preencha o formulário e a nossa equipa responderá o mais brevemente possível."
            />
          </div>
          <div className="lg:col-span-7">
            <QuoteForm compact />
          </div>
        </Container>
      </section>
    </>
  );
}
