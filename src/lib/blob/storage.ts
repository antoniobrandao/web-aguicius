import { get, put } from "@vercel/blob";

class BlobStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlobStorageError";
  }
}

function assertBlobWriteCredentials(): void {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN) {
    return;
  }

  throw new BlobStorageError(
    "Não foi possível gravar no Vercel Blob: falta a variável BLOB_READ_WRITE_TOKEN. Adicione-a ao .env.local ou sincronize os env vars da Vercel.",
  );
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
    cacheControlMaxAge: 60,
  });

  return { pathname: blob.pathname };
}

export async function readPrivateBlob(pathname: string) {
  return get(pathname, { access: "private", useCache: false });
}
