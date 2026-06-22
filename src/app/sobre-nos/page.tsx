import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { CtaBand } from "@/components/shared/cta-band";
import { StorySection } from "@/components/about/story-section";
import { LocationsSection } from "@/components/about/locations-section";
import { ValuesSection } from "@/components/about/values-section";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a Aguicius — soluções Smart de transporte e serviços, construídas sobre qualidade, sustentabilidade e ética.",
};

export default function SobreNosPage() {
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title="Sobre Nós"
        description="Soluções Smart para o mercado de serviços e transporte eficientes, sustentáveis e de qualidade."
      />
      <StorySection />
      <LocationsSection />
      <ValuesSection />
      <CtaBand
        title="Espírito Aguicius"
        description="Junte-se aos clientes que confiam na qualidade e no rigor dos nossos serviços Prime."
        primary={{ label: "Peça o seu orçamento", href: "/orcamento" }}
        secondary={{ label: "Ver serviços", href: "/servicos" }}
      />
    </>
  );
}
