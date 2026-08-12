import type { Metadata } from "next";

import { LegalContent } from "@/components/legal/legal-content";
import { PageHero } from "@/components/shared/page-hero";
import { pages } from "@/content/site";
import { getLegal } from "@/lib/content/content";

export const metadata: Metadata = pages.terms.seo;

export default async function TermosPage() {
  const legal = await getLegal();

  return (
    <>
      <PageHero {...pages.terms.hero} />
      <LegalContent sections={legal.terms?.sections ?? []} />
    </>
  );
}
