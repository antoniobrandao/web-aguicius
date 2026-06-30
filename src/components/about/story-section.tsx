import { Container } from "@/components/shared/container";
import type { WebsiteContent } from "@/lib/content/website-schema";

export function StorySection({
  story,
}: {
  story: WebsiteContent["pages"]["about"]["story"];
}) {
  const paragraphs = story.body.split(/\n{2,}/).filter(Boolean);

  return (
    <section className="bg-frontend-bg py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="frontend-eyebrow">{story.eyebrow}</span>
          <h2 className="frontend-display-heading mt-4 text-3xl text-frontend-heading sm:text-4xl">
            {story.title}
          </h2>
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
