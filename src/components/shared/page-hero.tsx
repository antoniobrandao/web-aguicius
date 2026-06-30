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
    <section className="bg-frontend-surface text-white">
      <Container className="frontend-section">
        {eyebrow ? (
          <span className="frontend-eyebrow">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="frontend-display-heading mt-5 max-w-4xl text-4xl sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="frontend-copy mt-6 max-w-2xl text-white/70">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
