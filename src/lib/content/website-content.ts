import { defaultWebsiteContent } from "@/content/default-website";
import { unstable_cache } from "next/cache";

import { getLatestWebsiteContent } from "./website-repository";
import { WEBSITE_CONTENT_TAG } from "./cache";
import type { LoadedWebsiteContent } from "./website-types";

const getCachedWebsiteContent = unstable_cache(
  async (): Promise<LoadedWebsiteContent> => {
    try {
      return await getLatestWebsiteContent();
    } catch (error) {
      // Keep the public site up if the content API is unavailable, but never
      // silently: in production this masks a real content problem.
      console.error(
        "[website-content] Falling back to default content:",
        error instanceof Error ? error.message : error,
      );
      return {
        content: defaultWebsiteContent,
        source: "default",
      };
    }
  },
  [WEBSITE_CONTENT_TAG],
  {
    tags: [WEBSITE_CONTENT_TAG],
    // Refresh periodically so backoffice edits propagate even without a push
    // to /api/revalidate. The tag still allows immediate invalidation.
    revalidate: 300,
  },
);

export async function getWebsiteContent(): Promise<LoadedWebsiteContent> {
  return getCachedWebsiteContent();
}

