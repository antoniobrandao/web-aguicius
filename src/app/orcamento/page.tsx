import type { Metadata } from "next";
import { Truck, Clock, ShieldCheck } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata: Metadata = {
  title: "Peça o seu orçamento",
  description:
    "Peça já o seu orçamento Aguicius sem compromisso. Soluções de transporte e serviços à sua medida.",
};

const perks = [
  {
    icon: Truck,
    title: "Cobertura nacional",
    description: "Saídas diárias em todo o território para cargas completas ou grupagem.",
  },
  {
    icon: Clock,
    title: "Resposta rápida",
    description: "Recebe o seu orçamento o mais brevemente possível, sem compromisso.",
  },
  {
    icon: ShieldCheck,
    title: "Garantia Aguicius",
    description: "Serviço Prime com qualidade e rigor em cada etapa do processo.",
  },
];

export default function OrcamentoPage() {
  return (
    <>
      <PageHero
        eyebrow="Reserve já!"
        title="Peça o seu orçamento"
        description="Adapte o transporte à sua medida e necessidade. Rapidez e qualidade ao melhor preço."
      />

      <section className="bg-background py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <div className="flex flex-col gap-6">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div key={perk.title} className="flex gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center bg-primary text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold uppercase tracking-wide text-secondary">
                        {perk.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border border-border bg-muted p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Prefere falar connosco?
              </p>
              <a
                href={site.phoneHref}
                className="mt-3 block text-2xl font-extrabold text-secondary transition-colors hover:text-primary"
              >
                {site.phone}
              </a>
              <p className="mt-1 text-sm text-muted-foreground">{site.email}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
