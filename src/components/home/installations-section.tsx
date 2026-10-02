import Link from "next/link";
import { Check } from "lucide-react";

import type { Cta, Service } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/site/ui/button";

export function InstallationsSection({
  service,
  content,
}: {
  service: Service;
  content: { eyebrow: string; title: string; button: Cta; highlights: string[] };
}) {
  return (
    <section className="bg-frontend-muted py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={service.description}
          />
          <Button asChild variant="primary" className="mt-8">
            <Link href={content.button.href}>{content.button.label}</Link>
          </Button>
        </div>

        <ul className="frontend-card divide-y divide-frontend-border px-7 py-2">
          {content.highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 py-5 font-medium text-frontend-heading"
            >
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-frontend-brand-soft text-frontend-brand">
                <Check className="size-4" strokeWidth={2.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
