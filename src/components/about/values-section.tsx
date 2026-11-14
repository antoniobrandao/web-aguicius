import { blockAttrs, fieldAttrs, itemAttrs } from "@/lib/content/blocks";
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
    <section {...blockAttrs("about.values")} className="bg-frontend-muted py-20 lg:py-28">
      <Container>
        <SectionHeading marked eyebrow={intro.eyebrow} title={intro.title} />

        <div {...fieldAttrs("list")} className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.slug} {...itemAttrs(value.slug)} className="flex flex-col gap-3">
              <span className="mb-2 block h-1 w-10 rounded-full bg-frontend-brand" aria-hidden />
              <h3 {...fieldAttrs("title")} className="frontend-card-title">
                {value.title}
              </h3>
              <p {...fieldAttrs("description")} className="frontend-copy text-[0.9375rem]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
