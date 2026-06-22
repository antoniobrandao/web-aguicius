import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function AboutBand() {
  return (
    <section className="relative overflow-hidden bg-surface-dark py-20 text-white lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-primary/25 blur-[130px]"
      />
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="display-heading text-6xl sm:text-7xl lg:text-8xl">
            100%
          </p>
          <p className="mt-2 text-2xl font-bold uppercase tracking-[0.2em] text-primary">
            Para si!
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <p className="text-xl font-semibold leading-snug text-white">
            A Aguicius proporciona aos seus clientes os melhores serviços. Com
            muita qualidade e rigor.
          </p>
          <p className="text-base leading-relaxed text-white/70">
            Promovemos o desenvolvimento sustentado através do respeito por todos
            os intervenientes, da qualificação contínua dos colaboradores, do
            cumprimento de todos os requisitos de segurança e com práticas amigas
            do ambiente, sempre com uma visão de médio e longo prazo.
          </p>
          <Button asChild variant="primary" className="mt-2 self-start">
            <Link href="/sobre-nos">
              Mais sobre nós
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
