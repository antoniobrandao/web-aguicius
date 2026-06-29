import { defaultWebsiteContent } from "@/content/default-website";
import { unstable_cache } from "next/cache";

import {
  getLatestWebsiteContent,
  saveWebsiteContentSnapshot,
} from "./website-repository";
import { WEBSITE_CONTENT_TAG } from "./cache";
import type {
  AguiciusWebsiteContent,
  LoadedWebsiteContent,
} from "./website-types";

const getCachedWebsiteContent = unstable_cache(
  async (): Promise<LoadedWebsiteContent> => {
    try {
      return await getLatestWebsiteContent();
    } catch {
      // Keep the public site up if MongoDB is unavailable during local work.
      return {
        content: defaultWebsiteContent,
        source: "default",
      };
    }
  },
  [WEBSITE_CONTENT_TAG],
  {
    tags: [WEBSITE_CONTENT_TAG],
    revalidate: false,
  },
);

export async function getWebsiteContent(): Promise<LoadedWebsiteContent> {
  return getCachedWebsiteContent();
}

export async function saveWebsiteContent(
  content: AguiciusWebsiteContent,
): Promise<AguiciusWebsiteContent> {
  const saved = await saveWebsiteContentSnapshot(content);
  return saved.content;
}
