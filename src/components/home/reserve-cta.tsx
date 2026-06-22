import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function ReserveCta() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(135deg, white 1px, transparent 1px), linear-gradient(45deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Container className="relative flex flex-col items-center gap-8 py-16 text-center lg:flex-row lg:justify-between lg:py-20 lg:text-left">
        <div>
          <h2 className="display-heading text-4xl sm:text-5xl lg:text-6xl">
            Reserve já!
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Peça já o seu orçamento sem compromisso e adapte o transporte à sua
            medida e necessidade.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="bg-white text-primary hover:bg-secondary hover:text-white"
        >
          <Link href="/orcamento">
            Aqui
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
