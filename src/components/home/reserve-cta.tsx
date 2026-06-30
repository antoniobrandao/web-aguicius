import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { WebsiteContent } from "@/lib/content/website-schema";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/site/ui/button";

export function ReserveCta({
  content,
}: {
  content: WebsiteContent["pages"]["home"]["reserveCta"];
}) {
  return (
    <section className="bg-frontend-brand text-white">
      <Container className="frontend-section-tight flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:py-20 lg:text-left">
        <div>
          <h2 className="frontend-display-heading text-4xl sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="frontend-copy mt-4 max-w-xl text-white/80">
            {content.description}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="bg-white text-frontend-brand hover:bg-frontend-surface hover:text-white"
        >
          <Link href={content.button.href}>
            {content.button.label}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
