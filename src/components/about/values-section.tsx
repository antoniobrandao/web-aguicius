import type { SectionIntro } from "@/lib/content/types";
import type { ValueContent } from "@/lib/content/resources";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export function ValuesSection({
  values,
  intro,
}: {
  values: ValueContent[];
  intro: SectionIntro;
}) {
  return (
    <section className="bg-frontend-muted py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={intro.eyebrow} title={intro.title} />

        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col gap-3">
              <span className="mb-2 block h-1 w-10 rounded-full bg-frontend-brand" aria-hidden />
              <h3 className="frontend-card-title">{value.title}</h3>
              <p className="frontend-copy text-[0.9375rem]">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
