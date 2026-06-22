import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-darker text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-[140px]"
      />

      <Container className="relative grid items-center gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          {/* <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            A nossa missão
          </span> */}
          <h1 className="display-heading mt-6 text-4xl sm:text-6xl lg:text-7xl">
            Soluções{" "}
            <span className="text-primary">Smart</span> de transporte e serviços
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            Desenvolver e aplicar soluções Smart para o mercado de serviços e
            transporte eficientes, sustentáveis e de qualidade — sempre na linha
            da frente do digital e da mobilidade técnica.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/orcamento">
                Peça o seu orçamento
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href="/servicos">Ver serviços</Link>
            </Button>
          </div>

          <a
            href={site.phoneHref}
            className="mt-10 inline-flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
          >
            <span className="inline-flex size-10 items-center justify-center border border-white/15 text-primary">
              <Phone className="size-4" />
            </span>
            <span className="font-semibold tracking-[0.1em]">{site.phone}</span>
          </a>
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 bg-surface-dark p-8"
              >
                <span className="text-4xl font-extrabold text-white">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const stats = [
  { value: "100%", label: "Para si" },
  { value: "24/48h", label: "Entregas express" },
  { value: "Nacional", label: "Cobertura" },
  { value: "Prime", label: "Serviço Aguicius" },
];
