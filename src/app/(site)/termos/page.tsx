import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { LegalContent } from "@/components/legal/legal-content";
import { getWebsiteContent } from "@/lib/content/website-content";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getWebsiteContent();
  return content.pages.terms.seo;
}

export default async function TermosPage() {
  const { content } = await getWebsiteContent();
  const page = content.pages.terms;

  return (
    <>
      <PageHero {...page.hero} />
      <LegalContent
        sections={page.sections.map((section) => ({
          heading: section.title,
          body: section.body,
        }))}
      />
    </>
  );
}
