import Link from "next/link";

import { SectionHeader } from "../../_components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAGE_KEYS } from "@/lib/content/constants";
import { getWebsiteContent } from "@/lib/content/website-content";

export const dynamic = "force-dynamic";

export default async function BackofficePagesPage() {
  const { content } = await getWebsiteContent();
  const labels = {
    home: "Home",
    about: "Sobre Nós",
    services: "Serviços",
    contact: "Contactos",
    quote: "Orçamento",
    terms: "Termos",
    privacy: "Privacidade",
  } as const;

  function pageDescription(pageKey: (typeof PAGE_KEYS)[number]) {
    switch (pageKey) {
      case "home":
        return "Homepage";
      case "about":
        return content.pages.about.seo.title;
      case "services":
        return content.pages.services.seo.title;
      case "contact":
        return content.pages.contact.seo.title;
      case "quote":
        return content.pages.quote.seo.title;
      case "terms":
        return content.pages.terms.seo.title;
      case "privacy":
        return content.pages.privacy.seo.title;
    }
  }

  return (
    <div className="grid gap-6">
      <SectionHeader
        eyebrow="Páginas"
        title="Páginas fixas"
        description="Lista de documentos Page. Abra uma página para editar apenas esse documento."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PAGE_KEYS.map((pageKey) => (
          <Link key={pageKey} href={`/backoffice/pages/${pageKey}`}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle>{labels[pageKey]}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-mono">{pageKey}</p>
                <p>{pageDescription(pageKey)}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
