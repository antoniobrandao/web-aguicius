import { blockAttrs, fieldAttrs } from "@/lib/content/blocks";
import { Container } from "@/components/shared/container";

/**
 * `block` is the key of the website block this hero renders (its `eyebrow`,
 * `title` and `description` fields); without it the hero is the site's own copy
 * and is not marked for the backoffice preview.
 */
export function PageHero({
  block,
  eyebrow,
  title,
  description,
}: {
  block?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  const mark = (id: string) => (block ? fieldAttrs(id) : {});

  return (
    <section {...(block ? blockAttrs(block) : {})} className="bg-frontend-muted">
      <Container className="py-16 lg:py-24">
        {eyebrow ? (
          <p {...mark("eyebrow")} className="frontend-eyebrow">
            {eyebrow}
          </p>
        ) : null}
        <h1
          {...mark("title")}
          className="frontend-display-heading frontend-display-lg mt-3 max-w-4xl text-frontend-heading">
          {title}
        </h1>
        {description ? (
          <p {...mark("description")} className="frontend-copy mt-5 max-w-2xl text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
