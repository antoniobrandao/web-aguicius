import { notFound } from "next/navigation";

import { getApiBaseUrl } from "@/lib/content/api";

type Params = Promise<{
  pathname: string[];
}>;

// Thin proxy to the casadigital.pt asset endpoint, so this site needs no blob
// token and components keep using same-origin /api/blob/<pathname> URLs.
export async function GET(_request: Request, { params }: { params: Params }) {
  const { pathname } = await params;
  const blobPathname = pathname.join("/");

  if (!blobPathname || blobPathname.includes("..")) {
    notFound();
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/v1/assets/${blobPathname
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`,
  );

  if (!response.ok || !response.body) {
    notFound();
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
