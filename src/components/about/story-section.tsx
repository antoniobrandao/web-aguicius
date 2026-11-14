import { blockAttrs, fieldAttrs, itemAttrs } from "@/lib/content/blocks";
import { Container } from "@/components/shared/container";

/**
 * The website block `about.story`. `paragraphs` are the items of its list, each
 * with its position in the saved list so the backoffice preview can point at it.
 * Renders nothing while there is no paragraph to show.
 */
export function StorySection({
  eyebrow,
  title,
  paragraphs,
}: {
  eyebrow?: string;
  title?: string;
  paragraphs: { index: number; text: string }[];
}) {
  if (!paragraphs.length) {
    return null;
  }

  return (
    <section {...blockAttrs("about.story")} className="bg-frontend-bg py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {eyebrow ? (
            <p {...fieldAttrs("eyebrow")} className="frontend-eyebrow">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2
              {...fieldAttrs("title")}
              className="frontend-display-heading frontend-display-md mt-3 text-frontend-heading"
            >
              {title}
            </h2>
          ) : null}
        </div>

        <div
          {...fieldAttrs("paragraphs")}
          className="frontend-copy flex flex-col gap-5 text-[1.0625rem] lg:col-span-7"
        >
          {paragraphs.map((paragraph, position) => (
            <div key={paragraph.index} {...itemAttrs(paragraph.index)}>
              <p
                {...fieldAttrs("text")}
                className={
                  position === paragraphs.length - 1
                    ? "text-xl font-medium leading-8 text-frontend-heading"
                    : undefined
                }
              >
                {paragraph.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
