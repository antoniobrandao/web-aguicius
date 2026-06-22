import { Container } from "@/components/shared/container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-surface-dark text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          // backgroundImage:
          //   "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-96 w-96 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px] lg:block"
      />
      <Container className="relative py-20 lg:py-28">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="display-heading mt-5 max-w-4xl text-4xl sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
