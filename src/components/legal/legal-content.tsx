import { Container } from "@/components/shared/container";

export function LegalContent({
  sections,
}: {
  sections: { title: string; body: string }[];
}) {
  if (!sections.length) {
    return null;
  }

  return (
    <section className="bg-frontend-bg py-20 lg:py-28">
      <Container className="max-w-3xl">
        <div className="flex flex-col gap-9">
          {sections.map((section, index) => (
            <div key={section.title || index} className="flex flex-col gap-3">
              {section.title ? (
                <h2 className="frontend-card-title">
                  {section.title}
                </h2>
              ) : null}
              {section.body ? <p className="frontend-copy">{section.body}</p> : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
