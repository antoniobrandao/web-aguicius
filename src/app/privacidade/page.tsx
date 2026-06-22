import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { LegalContent } from "@/components/legal/legal-content";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Aguicius recolhe e trata os seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Política de Privacidade" />
      <LegalContent
        sections={[
          {
            heading: "1. Dados recolhidos",
            body: "Recolhemos apenas os dados necessários para responder aos seus pedidos de orçamento e prestar os nossos serviços, tais como nome, email, telefone e detalhes do serviço pretendido.",
          },
          {
            heading: "2. Finalidade",
            body: "Os dados são utilizados exclusivamente para a gestão da relação comercial, resposta a pedidos e prestação dos serviços contratados.",
          },
          {
            heading: "3. Conservação",
            body: "Os dados pessoais são conservados apenas durante o período necessário às finalidades para que foram recolhidos, ou conforme exigido por lei.",
          },
          {
            heading: "4. Direitos do titular",
            body: "Pode solicitar a qualquer momento o acesso, retificação ou eliminação dos seus dados pessoais através dos nossos contactos.",
          },
        ]}
      />
    </>
  );
}
