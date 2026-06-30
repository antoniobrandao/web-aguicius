import Link from "next/link";

import { SectionHeader } from "../../_components/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWebsiteContent } from "@/lib/content/website-content";

export const dynamic = "force-dynamic";

export default async function BackofficeLocationsPage() {
  const { content } = await getWebsiteContent();

  return (
    <div className="grid gap-6">
      <SectionHeader
        eyebrow="Localizações"
        title="Localizações"
        description="Lista de documentos Location. Abra uma localização para editar apenas esse documento."
      />
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/backoffice/locations/new">Nova localização</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {content.locations.map((location) => (
          <Link key={location.slug} href={`/backoffice/locations/${location.slug}`}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle>{location.city}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-muted-foreground">
                <p>{location.lines.join(", ")}</p>
                <p className="font-mono text-xs">
                  {location.slug}
                  {location.primary ? " · principal" : ""}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
