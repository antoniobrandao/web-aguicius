import { Container } from "@/components/shared/container";

export function LegalContent({
  sections,
}: {
  sections: { heading: string; body: string }[];
}) {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container className="max-w-3xl">
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-secondary">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
