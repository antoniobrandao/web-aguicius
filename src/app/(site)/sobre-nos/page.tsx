import type { Metadata } from "next";

import { LocationsSection } from "@/components/about/locations-section";
import { StorySection } from "@/components/about/story-section";
import { ValuesSection } from "@/components/about/values-section";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { designCopy } from "@/content/design-copy";
import { pages } from "@/content/site";
import { buildPageMetadata } from "@/lib/content/metadata";
import { getLocations, getValues } from "@/lib/content/content";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(pages.about.seo);
}

export default async function SobreNosPage() {
  const [locations, values] = await Promise.all([
    getLocations(),
    getValues(),
  ]);
  const copy = designCopy.about;

  return (
    <>
      <PageHero {...pages.about.hero} />
      {pages.about.prose.length ? (
        <StorySection eyebrow={copy.storyEyebrow} sections={pages.about.prose} />
      ) : null}
      {locations.length ? (
        <LocationsSection locations={locations} intro={copy.locationsIntro} />
      ) : null}
      {values.length ? <ValuesSection values={values} intro={copy.valuesIntro} /> : null}
      <CtaBand
        title={copy.ctaBand.title}
        description={copy.ctaBand.description}
        primary={copy.ctaBand.primary}
        secondary={copy.ctaBand.secondary}
      />
    </>
  );
}
