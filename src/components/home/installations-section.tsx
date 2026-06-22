import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { installations } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

const highlights = [
  "Consultoria e obra para adaptações",
  "Instalação de eletrodomésticos",
  "Equipamentos industriais ou de escritório",
  "Qualidade garantida AGUICIUS",
];

export function InstallationsSection() {
  return (
    <section className="bg-muted py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Serviços Prime"
            title="Instalações"
            description={installations.description}
          />
          <Button asChild variant="default" className="mt-8">
            <Link href="/servicos">
              Mais serviços
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 bg-card p-6 text-sm font-medium text-secondary"
            >
              <span className="inline-flex size-6 shrink-0 items-center justify-center bg-primary text-white">
                <Check className="size-4" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
