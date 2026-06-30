import { Container } from "@/components/shared/container";

export function LegalContent({
  sections,
}: {
  sections: { heading: string; body: string }[];
}) {
  return (
    <section className="bg-frontend-bg py-20 lg:py-28">
      <Container className="max-w-3xl">
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-3">
              <h2 className="text-xl font-medium leading-7 tracking-widest text-frontend-heading">
                {section.heading}
              </h2>
              <p className="frontend-copy">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
