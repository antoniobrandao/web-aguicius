import { notFound } from "next/navigation";

import { PageDocumentEditor } from "../../../_components/editors";
import { SectionHeader } from "../../../_components/shell";
import { PAGE_KEYS } from "@/lib/content/constants";
import { getWebsiteContent } from "@/lib/content/website-content";

export const dynamic = "force-dynamic";

const labels = {
  home: "Home",
  about: "Sobre Nós",
  services: "Serviços",
  contact: "Contactos",
  quote: "Orçamento",
  terms: "Termos",
  privacy: "Privacidade",
} as const;

export default async function BackofficePageDocumentPage({
  params,
}: {
  params: Promise<{ pageKey: string }>;
}) {
  const { pageKey } = await params;
  if (!PAGE_KEYS.includes(pageKey as (typeof PAGE_KEYS)[number])) {
    notFound();
  }

  const key = pageKey as (typeof PAGE_KEYS)[number];
  const { content } = await getWebsiteContent();

  return (
    <div className="grid gap-6">
      <SectionHeader
        eyebrow="Páginas"
        title={labels[key]}
        description="Este ecrã grava apenas este documento Page."
      />
      <PageDocumentEditor pageKey={key} initialPage={content.pages[key]} />
    </div>
  );
}
