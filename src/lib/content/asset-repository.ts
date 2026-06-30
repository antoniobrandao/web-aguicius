import { connectMongoose } from "@/lib/mongoose/client";
import { AssetModel } from "@/lib/mongoose/models";

import { getSiteKey, resolveSite } from "./website-repository";

export type SaveAssetInput = {
  pathname: string;
  url?: string;
  originalName?: string;
  contentType: string;
  size: number;
  width?: number;
  height?: number;
  alt?: string;
};

export async function saveAsset(input: SaveAssetInput) {
  await connectMongoose();
  const site = await resolveSite();

  const result = await AssetModel.findOneAndUpdate(
    { siteId: site._id, pathname: input.pathname },
    {
      $set: {
        siteId: site._id,
        pathname: input.pathname,
        url: input.url,
        originalName: input.originalName,
        contentType: input.contentType,
        size: input.size,
        width: input.width,
        height: input.height,
        alt: input.alt,
        deletedAt: null,
      },
    },
    { new: true, upsert: true },
  ).lean();

  if (!result) {
    throw new Error(`Could not save asset for site "${getSiteKey()}".`);
  }

  return {
    ...result,
    assetId: result._id.toString(),
  };
}
