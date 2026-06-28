import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  getCollectionName,
  getLatestWebsiteSnapshot,
} from "@/lib/content/website-repository";

import { seedDefaultWebsiteContentAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function DataAdminPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const latest = await getLatestWebsiteSnapshot().catch(() => null);
  const collection = getCollectionName();

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Data Admin
        </p>
        <h1 className="text-3xl font-bold">Seed inicial do website</h1>
        <p className="text-muted-foreground">
          Esta página só funciona em desenvolvimento e grava o conteúdo default
          na coleção MongoDB configurada.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 text-sm">
        <dl className="grid gap-3">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Coleção</dt>
            <dd className="font-mono">{collection}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Última revisão</dt>
            <dd>{latest?.revision ?? "Sem documentos"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Criado em</dt>
            <dd>{latest?.createdAt?.toISOString() ?? "—"}</dd>
          </div>
        </dl>
      </div>

      <form action={seedDefaultWebsiteContentAction}>
        <Button type="submit">Gravar default como nova revisão</Button>
      </form>
    </main>
  );
}
