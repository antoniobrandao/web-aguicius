import { Container } from "@/components/shared/container";

export function StorySection({
  eyebrow,
  sections,
}: {
  eyebrow?: string;
  sections: { title: string; body: string }[];
}) {
  const [lead, ...rest] = sections;

  if (!lead) {
    return null;
  }

  const paragraphs = [lead.body, ...rest.map((section) => section.body)]
    .flatMap((body) => body.split(/\n{2,}/))
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="bg-frontend-bg py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {eyebrow ? <span className="frontend-eyebrow">{eyebrow}</span> : null}
          {lead.title ? (
            <h2 className="frontend-display-heading mt-4 text-3xl text-frontend-heading sm:text-4xl">
              {lead.title}
            </h2>
          ) : null}
        </div>

        <div className="frontend-copy flex flex-col gap-5 lg:col-span-7">
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === paragraphs.length - 1
                  ? "text-xl font-medium leading-8 tracking-widest text-frontend-heading"
                  : undefined
              }
            >
              {paragraph.replaceAll("**", "")}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
