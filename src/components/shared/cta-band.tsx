import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/site/ui/button";

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
    <section className="frontend-section-tight bg-frontend-surface-dark text-white lg:py-20">
      <Container className="flex flex-col items-center gap-8 text-center">
        <h2 className="frontend-display-heading max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description ? (
          <p className="frontend-copy max-w-2xl text-white/70">{description}</p>
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
