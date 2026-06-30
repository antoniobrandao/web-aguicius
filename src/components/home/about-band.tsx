import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { WebsiteContent } from "@/lib/content/website-schema";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/site/ui/button";

export function AboutBand({
  content,
}: {
  content: WebsiteContent["pages"]["home"]["aboutBand"];
}) {
  return (
    <section className="frontend-section bg-frontend-surface text-white">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="frontend-display-heading text-6xl sm:text-7xl lg:text-8xl">
            {content.statValue}
          </p>
          <p className="frontend-small-label mt-2 text-frontend-brand">
            {content.statLabel}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <p className="text-xl font-medium leading-8 text-white">
            {content.lead}
          </p>
          <p className="frontend-copy text-white/70">
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
