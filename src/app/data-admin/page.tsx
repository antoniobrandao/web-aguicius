import { notFound } from "next/navigation";

import { getSiteKey } from "@/lib/content/website-repository";

import { SeedForm } from "./seed-form";

export const dynamic = "force-dynamic";

export default async function DataAdminPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const siteKey = getSiteKey();

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Data Admin
        </p>
        <h1 className="text-3xl font-bold">Seed inicial do website</h1>
        <p className="text-muted-foreground">
          Esta página só funciona em desenvolvimento e grava o conteúdo default
          nas coleções normalizadas.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 text-sm">
        <dl className="grid gap-3">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Site key</dt>
            <dd className="font-mono">{siteKey}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Ligação Mongo</dt>
            <dd>Só ao gravar</dd>
          </div>
        </dl>
      </div>

      <SeedForm />
    </main>
  );
}
