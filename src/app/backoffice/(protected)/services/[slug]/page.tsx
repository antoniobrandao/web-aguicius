import { notFound } from "next/navigation";

import { ServiceDocumentEditor } from "../../../_components/editors";
import { SectionHeader } from "../../../_components/shell";
import { getWebsiteContent } from "@/lib/content/website-content";
import type { WebsiteContent } from "@/lib/content/website-schema";

export const dynamic = "force-dynamic";

const emptyService: WebsiteContent["services"][number] = {
  slug: "novo-servico",
  title: "Novo serviço",
  icon: "truck",
  tier: "secondary",
  short: "Resumo do serviço.",
  description: "Descrição do serviço.",
  image: { alt: "Imagem do serviço" },
};

export default async function BackofficeServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content } = await getWebsiteContent();
  const service =
    slug === "new"
      ? emptyService
      : content.services.find((item) => item.slug === slug);

  if (!service) notFound();

  return (
    <div className="grid gap-6">
      <SectionHeader
        eyebrow="Serviços"
        title={slug === "new" ? "Novo serviço" : service.title}
        description="Este ecrã grava apenas este documento Service."
      />
      <ServiceDocumentEditor initialService={service} />
    </div>
  );
}
