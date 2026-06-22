import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function CtaBand({
  title,
  description,
  primary = { label: "Peça o seu orçamento", href: "/orcamento" },
  secondary,
}: {
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-surface-darker py-16 text-white lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]"
      />
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <h2 className="display-heading text-3xl sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-lg text-white/70">{description}</p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="primary" size="lg">
            <Link href={primary.href}>
              {primary.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          {secondary ? (
            <Button asChild variant="outlineLight" size="lg">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
