import { values } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export function ValuesSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="O que nos move"
          title="Os nossos valores"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="flex flex-col gap-5 border-t-2 border-primary pt-8"
            >
              <span className="text-5xl font-extrabold text-border">
                0{index + 1}
              </span>
              <h3 className="text-xl font-bold uppercase tracking-wide text-secondary">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
