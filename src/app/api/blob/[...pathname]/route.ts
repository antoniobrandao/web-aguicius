import { notFound } from "next/navigation";

import { readPrivateBlob } from "@/lib/blob/storage";

type Params = Promise<{
  pathname: string[];
}>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { pathname } = await params;
  const blobPathname = pathname.join("/");

  if (!blobPathname || blobPathname.includes("..")) {
    notFound();
  }

  const result = await readPrivateBlob(blobPathname);
  if (!result || result.statusCode === 304 || !result.stream) {
    notFound();
  }

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
}
