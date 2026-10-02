import Link from "next/link";

import type { Cta } from "@/lib/content/types";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/site/ui/button";

export function ReserveCta({
  content,
}: {
  content: { title: string; description: string; button: Cta };
}) {
  return (
    <section className="bg-frontend-bg py-10 lg:py-14">
      <Container>
        <div className="flex flex-col items-start gap-8 rounded-[28px] bg-frontend-brand px-8 py-12 text-white sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-16">
          <div>
            <h2 className="frontend-display-heading frontend-display-md">{content.title}</h2>
            <p className="frontend-copy mt-3 max-w-xl text-[1.0625rem] text-white/85">
              {content.description}
            </p>
          </div>
          <Button asChild variant="light" size="lg" className="shrink-0">
            <Link href={content.button.href}>{content.button.label}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
