import { Container } from "@/components/shared/container";
import type { WebsiteContent } from "@/lib/content/website-schema";

export function StorySection({
  story,
}: {
  story: WebsiteContent["pages"]["about"]["story"];
}) {
  const paragraphs = story.body.split(/\n{2,}/).filter(Boolean);

  return (
    <section className="bg-background py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="eyebrow">{story.eyebrow}</span>
          <h2 className="display-heading mt-4 text-3xl text-secondary sm:text-4xl">
            {story.title}
          </h2>
        </div>

        <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground lg:col-span-7">
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === paragraphs.length - 1
                  ? "text-xl font-bold uppercase tracking-wide text-secondary"
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
