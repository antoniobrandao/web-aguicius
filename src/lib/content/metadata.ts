import type { Metadata } from "next";

import type { PageContent } from "./resources";

/**
 * Builds page metadata from authored SEO fields, omitting anything not filled in
 * so the layout's site-wide defaults apply instead of an empty title or
 * description.
 */
export function toPageMetadata(page: PageContent): Metadata {
  const title = page.seo.title.trim() || page.hero.title.trim();
  const description = page.seo.description.trim() || page.hero.description.trim();

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  };
}
