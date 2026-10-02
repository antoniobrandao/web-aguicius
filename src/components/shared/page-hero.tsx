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
    <section className="bg-frontend-muted">
      <Container className="py-16 lg:py-24">
        {eyebrow ? <p className="frontend-eyebrow">{eyebrow}</p> : null}
        <h1 className="frontend-display-heading frontend-display-lg mt-3 max-w-4xl text-frontend-heading">
          {title}
        </h1>
        {description ? (
          <p className="frontend-copy mt-5 max-w-2xl text-lg">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}
