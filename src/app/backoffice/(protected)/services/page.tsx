import Link from "next/link";

import { SectionHeader } from "../../_components/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWebsiteContent } from "@/lib/content/website-content";

export const dynamic = "force-dynamic";

export default async function BackofficeServicesPage() {
  const { content } = await getWebsiteContent();

  return (
    <div className="grid gap-6">
      <SectionHeader
        eyebrow="Serviços"
        title="Serviços"
        description="Lista de documentos Service. Abra um serviço para editar e gravar apenas esse documento."
      />
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/backoffice/services/new">Novo serviço</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {content.services.map((service) => (
          <Link key={service.slug} href={`/backoffice/services/${service.slug}`}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-muted-foreground">
                <p>{service.short}</p>
                <p className="font-mono text-xs">{service.slug}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
