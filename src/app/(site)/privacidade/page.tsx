import type { Metadata } from "next";

import { LegalContent } from "@/components/legal/legal-content";
import { PageHero } from "@/components/shared/page-hero";
import { getPage } from "@/lib/content/content";
import { toPageMetadata } from "@/lib/content/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return toPageMetadata(await getPage("privacy"));
}

export default async function PrivacidadePage() {
  const page = await getPage("privacy");

  return (
    <>
      <PageHero {...page.hero} />
      <LegalContent sections={page.sections} />
    </>
  );
}
