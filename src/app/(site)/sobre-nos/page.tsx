import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { CtaBand } from "@/components/shared/cta-band";
import { StorySection } from "@/components/about/story-section";
import { LocationsSection } from "@/components/about/locations-section";
import { ValuesSection } from "@/components/about/values-section";
import { getWebsiteContent } from "@/lib/content/website-content";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getWebsiteContent();
  return content.pages.about.seo;
}

export default async function SobreNosPage() {
  const { content } = await getWebsiteContent();
  const page = content.pages.about;

  return (
    <>
      <PageHero {...page.hero} />
      <StorySection story={page.story} />
      <LocationsSection
        locations={content.locations}
        intro={page.locationsIntro}
      />
      <ValuesSection values={content.values} intro={page.valuesIntro} />
      <CtaBand
        title={page.ctaBand.title}
        description={page.ctaBand.description}
        primary={page.ctaBand.primary}
        secondary={page.ctaBand.secondary}
      />
    </>
  );
}
