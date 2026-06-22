import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { LegalContent } from "@/components/legal/legal-content";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos e condições de utilização dos serviços Aguicius.",
};

export default function TermosPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Termos e Condições" />
      <LegalContent
        sections={[
          {
            heading: "1. Âmbito",
            body: "Os presentes termos e condições regulam a prestação dos serviços de transporte, montagens, instalações, entregas, mudanças e armazenamento disponibilizados pela Aguicius.",
          },
          {
            heading: "2. Orçamentos",
            body: "Todos os orçamentos solicitados são gratuitos e sem compromisso. Os valores apresentados são válidos pelo período indicado em cada proposta.",
          },
          {
            heading: "3. Responsabilidade",
            body: "A Aguicius compromete-se a executar os serviços com qualidade e rigor, cumprindo todos os requisitos de segurança aplicáveis ao transporte e manuseamento de mercadorias.",
          },
          {
            heading: "4. Contactos",
            body: "Para qualquer questão relativa a estes termos, contacte-nos através dos meios disponíveis na página de contactos.",
          },
        ]}
      />
    </>
  );
}
