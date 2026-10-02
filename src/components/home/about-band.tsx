import Link from "next/link";

import type { Cta } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/site/ui/button";

export function AboutBand({
  content,
}: {
  content: {
    statValue: string;
    statLabel: string;
    lead: string;
    body: string;
    cta: Cta;
  };
}) {
  return (
    <section className="bg-frontend-muted py-20 lg:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-4">
          <p className="frontend-display-heading text-7xl tabular-nums text-frontend-brand lg:text-8xl">
            {content.statValue}
          </p>
          <p className="mt-2 text-lg font-semibold text-frontend-heading">
            {content.statLabel}
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-8">
          <p className="frontend-display-heading frontend-display-sm max-w-2xl text-frontend-heading">
            {content.lead}
          </p>
          <p className="frontend-copy max-w-2xl text-[1.0625rem]">{content.body}</p>
          <Button asChild variant="outline" className="mt-3 self-start bg-frontend-bg">
            <Link href={content.cta.href}>{content.cta.label}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
