import type { Metadata } from "next";

import { LocationsSection } from "@/components/about/locations-section";
import { StorySection } from "@/components/about/story-section";
import { ValuesSection } from "@/components/about/values-section";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { designCopy } from "@/content/design-copy";
import { pages } from "@/content/site";
import { buildPageMetadata } from "@/lib/content/metadata";
import { listOf, textOf } from "@/lib/content/blocks";
import {
  boundLocations,
  boundValues,
  ctaBandOf,
  introOf,
  itemText,
} from "@/lib/content/bound";
import { getBlocks, getLocations, getValues } from "@/lib/content/content";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(pages.about.seo);
}

export default async function SobreNosPage() {
  const [blocks, readLocations, readValues] = await Promise.all([
    getBlocks(),
    getLocations(),
    getValues(),
  ]);
  const copy = designCopy.about;

  // Bound content: the documents each block serves, else the resource read here.
  const locations = boundLocations(blocks, "about.locations", "list") ?? readLocations;
  const values = boundValues(blocks, "about.values", "list") ?? readValues;

  // The story is the block's list of paragraphs when the owner wrote one, else
  // the prose in src/content/site.ts. With neither, the section is not shown.
  const prose: { title: string; body: string }[] = pages.about.prose;
  const savedParagraphs = listOf<unknown>(blocks, "about.story", "paragraphs", [])
    .map((item, index) => ({ index, text: itemText(item, "text") }))
    .filter((paragraph) => paragraph.text);
  const storyParagraphs = savedParagraphs.length
    ? savedParagraphs
    : prose
        .flatMap((section) => section.body.split(/\n{2,}/))
        .map((paragraph) => paragraph.trim().replaceAll("**", ""))
        .filter(Boolean)
        .map((text, index) => ({ index, text }));

  return (
    <>
      <PageHero block="about.hero" {...introOf(blocks, "about.hero", pages.about.hero)} />
      <StorySection
        eyebrow={textOf(blocks, "about.story", "eyebrow", copy.storyEyebrow)}
        title={textOf(blocks, "about.story", "title", prose[0]?.title ?? "")}
        paragraphs={storyParagraphs}
      />
      {locations.length ? (
        <LocationsSection
          locations={locations}
          intro={introOf(blocks, "about.locations", copy.locationsIntro)}
        />
      ) : null}
      {values.length ? (
        <ValuesSection values={values} intro={introOf(blocks, "about.values", copy.valuesIntro)} />
      ) : null}
      <CtaBand block="about.cta" {...ctaBandOf(blocks, "about.cta", copy.ctaBand)} />
    </>
  );
}
