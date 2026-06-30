import { notFound } from "next/navigation";

import { LocationDocumentEditor } from "../../../_components/editors";
import { SectionHeader } from "../../../_components/shell";
import { getWebsiteContent } from "@/lib/content/website-content";
import type { WebsiteContent } from "@/lib/content/website-schema";

export const dynamic = "force-dynamic";

const emptyLocation: WebsiteContent["locations"][number] = {
  slug: "nova-localizacao",
  city: "Cidade",
  lines: ["Morada"],
  primary: false,
};

export default async function BackofficeLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content } = await getWebsiteContent();
  const location =
    slug === "new"
      ? emptyLocation
      : content.locations.find((item) => item.slug === slug);

  if (!location) notFound();

  return (
    <div className="grid gap-6">
      <SectionHeader
        eyebrow="Localizações"
        title={slug === "new" ? "Nova localização" : location.city}
        description="Este ecrã grava apenas este documento Location."
      />
      <LocationDocumentEditor initialLocation={location} />
    </div>
  );
}
