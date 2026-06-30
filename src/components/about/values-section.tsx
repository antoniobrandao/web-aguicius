import type { WebsiteContent, WebsiteValue } from "@/lib/content/website-schema";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export function ValuesSection({
  values,
  intro,
}: {
  values: WebsiteValue[];
  intro: WebsiteContent["pages"]["about"]["valuesIntro"];
}) {
  return (
    <section className="bg-frontend-bg py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          title={intro.title}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="flex flex-col gap-5 border-t-2 border-frontend-brand pt-8"
            >
              <span className="text-5xl font-medium text-frontend-border">
                0{index + 1}
              </span>
              <h3 className="text-xl font-medium leading-7 tracking-widest text-frontend-heading">
                {value.title}
              </h3>
              <p className="frontend-copy text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
