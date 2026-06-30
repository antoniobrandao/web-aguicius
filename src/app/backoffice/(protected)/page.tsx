import Link from "next/link";

import { SectionHeader } from "../_components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWebsiteContent } from "@/lib/content/website-content";
import { getNormalizedContentSummary } from "@/lib/content/website-repository";

export const dynamic = "force-dynamic";

export default async function BackofficePage() {
  const { content, source } = await getWebsiteContent();
  const showDataPanel = process.env.NODE_ENV === "development";
  const summary = showDataPanel
    ? await getNormalizedContentSummary().catch(() => null)
    : null;
  const cards = [
    { label: "Serviços", value: content.services.length, href: "/backoffice/services" },
    { label: "Páginas", value: Object.keys(content.pages).length, href: "/backoffice/pages" },
    { label: "Localizações", value: content.locations.length, href: "/backoffice/locations" },
    { label: "Valores", value: content.values.length, href: "/backoffice/website" },
  ];

  return (
    <div className="grid gap-6">
      <SectionHeader
        eyebrow="Painel"
        title="Visão geral"
        description="Estado do website e atalhos para as áreas de edição normalizadas."
      />
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="text-sm">{card.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-semibold">{card.value}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {showDataPanel ? (
        <Card>
          <CardHeader>
            <CardTitle>Dados</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground">
            <p>Fonte atual: {source === "mongo" ? "MongoDB normalizado" : "conteúdo default"}</p>
            <p>Site: {summary?.site.key ?? "não resolvido"}</p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
