import Link from "next/link";

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
    <section className="bg-frontend-bg py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-[28px] bg-frontend-brand px-6 py-14 text-center text-white sm:px-10 lg:py-20">
          <h2 className="frontend-display-heading frontend-display-md max-w-3xl">{title}</h2>
          {description ? (
            <p className="frontend-copy max-w-xl text-[1.0625rem] text-white/85">
              {description}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="light" size="lg">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
            {secondary ? (
              <Button asChild variant="outlineLight" size="lg">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
