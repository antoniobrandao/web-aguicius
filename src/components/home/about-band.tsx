import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { WebsiteContent } from "@/lib/content/website-schema";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function AboutBand({
  content,
}: {
  content: WebsiteContent["pages"]["home"]["aboutBand"];
}) {
  return (
    <section className="relative overflow-hidden bg-surface-dark py-20 text-white lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-primary/25 blur-[130px]"
      />
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="display-heading text-6xl sm:text-7xl lg:text-8xl">
            {content.statValue}
          </p>
          <p className="mt-2 text-2xl font-bold uppercase tracking-[0.2em] text-primary">
            {content.statLabel}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <p className="text-xl font-semibold leading-snug text-white">
            {content.lead}
          </p>
          <p className="text-base leading-relaxed text-white/70">
            {content.body}
          </p>
          <Button asChild variant="primary" className="mt-2 self-start">
            <Link href={content.cta.href}>
              {content.cta.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
