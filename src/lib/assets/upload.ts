import { writeFileBlob } from "@/lib/blob/storage";
import { saveAsset } from "@/lib/content/asset-repository";

type UploadAssetInput = {
  file: File;
  pathname: string;
  alt?: string;
  width?: number;
  height?: number;
};

export async function uploadAsset({
  file,
  pathname,
  alt,
  width,
  height,
}: UploadAssetInput) {
  const blob = await writeFileBlob(pathname, file, file.type);

  return saveAsset({
    pathname: blob.pathname,
    url: blob.url,
    originalName: file.name,
    contentType: file.type,
    size: file.size,
    width,
    height,
    alt,
  });
}
