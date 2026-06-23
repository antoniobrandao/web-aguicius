import { del, get, list, put } from "@vercel/blob";

import { CmsError } from "./types";

const SAFE_SLUG = /^[a-z0-9][a-z0-9-_]*$/;

const DEFAULT_CACHE_MAX_AGE = 60;

function assertBlobWriteCredentials(): void {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN) {
    return;
  }

  throw new CmsError(
    "Não foi possível gravar no Vercel Blob: falta a variável BLOB_READ_WRITE_TOKEN. Adicione-a ao .env.local ou sincronize os env vars da Vercel.",
  );
}

export function assertSafeSlug(slug: string): void {
  if (typeof slug !== "string" || slug.length === 0) {
    throw new CmsError("Slug must be a non-empty string.");
  }
  if (slug.includes("/") || slug.includes("..")) {
    throw new CmsError(`Unsafe slug: "${slug}".`);
  }
  if (!SAFE_SLUG.test(slug)) {
    throw new CmsError(
      `Invalid slug "${slug}". Use lowercase letters, numbers, "-" and "_".`,
    );
  }
}

async function findBlobByPathname(pathname: string) {
  const { blobs } = await list({ prefix: pathname, limit: 1000 });
  return blobs.find((blob) => blob.pathname === pathname) ?? null;
}

export async function readBlob(pathname: string): Promise<string | null> {
  const blob = await get(pathname, { access: "private", useCache: false });
  if (!blob || blob.statusCode === 304 || !blob.stream) return null;

  return new Response(blob.stream).text();
}

export async function writeBlob(
  pathname: string,
  contents: string,
): Promise<void> {
  assertBlobWriteCredentials();

  await put(pathname, contents, {
    access: "private",
    contentType: "text/markdown; charset=utf-8",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: DEFAULT_CACHE_MAX_AGE,
  });
}

export async function writeFileBlob(
  pathname: string,
  body: File | Blob | ArrayBuffer,
  contentType: string,
): Promise<{ pathname: string }> {
  assertBlobWriteCredentials();

  const blob = await put(pathname, body, {
    access: "private",
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: DEFAULT_CACHE_MAX_AGE,
  });

  return { pathname: blob.pathname };
}

export async function readPrivateBlob(pathname: string) {
  return get(pathname, { access: "private", useCache: false });
}

export async function deleteBlob(pathname: string): Promise<void> {
  assertBlobWriteCredentials();

  await del(pathname);
}

export async function listBlobPathnames(prefix: string): Promise<string[]> {
  const pathnames: string[] = [];
  let cursor: string | undefined;

  do {
    const result = await list({ prefix, cursor, limit: 1000 });
    for (const blob of result.blobs) {
      pathnames.push(blob.pathname);
    }
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  return pathnames;
}

export async function blobExists(pathname: string): Promise<boolean> {
  return (await findBlobByPathname(pathname)) !== null;
}
