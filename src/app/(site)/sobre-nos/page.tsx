import type { Metadata } from "next";

import { LocationsSection } from "@/components/about/locations-section";
import { StorySection } from "@/components/about/story-section";
import { ValuesSection } from "@/components/about/values-section";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { designCopy } from "@/content/design-copy";
import { getLocations, getPage, getValues } from "@/lib/content/content";
import { toPageMetadata } from "@/lib/content/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return toPageMetadata(await getPage("about"));
}

export default async function SobreNosPage() {
  const [page, locations, values] = await Promise.all([
    getPage("about"),
    getLocations(),
    getValues(),
  ]);
  const copy = designCopy.about;

  return (
    <>
      <PageHero {...page.hero} />
      {page.sections.length ? (
        <StorySection eyebrow={copy.storyEyebrow} sections={page.sections} />
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
