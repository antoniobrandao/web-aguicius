import { defaultWebsiteContent } from "@/content/default-website";

import { websiteContentSchema } from "./website-schema";
import type {
  AguiciusWebsiteContent,
  LoadedWebsiteContent,
} from "./website-types";

// This site is a pure view: all content lives in the casadigital.pt database
// and is fetched through its Site API, authenticated with this site's API key.

export function getApiBaseUrl() {
  return (process.env.CASADIGITAL_API_URL ?? "https://casadigital.pt").replace(/\/+$/, "");
}

export function getSiteApiKey() {
  const apiKey = process.env.SITE_API_KEY;

  if (!apiKey) {
    throw new Error("SITE_API_KEY is not set.");
  }

  return apiKey;
}

function normalizeContent(data: unknown): AguiciusWebsiteContent {
  const parsed = websiteContentSchema.parse(data);

  return {
    ...parsed,
    services: parsed.services.map((service) => ({
      ...service,
      image:
        service.image && typeof service.image === "object"
          ? service.image
          : {
              alt: `${service.title} ${parsed.site.name}`,
            },
    })),
  };
}

export async function getLatestWebsiteContent(): Promise<LoadedWebsiteContent> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/content`, {
    headers: { Authorization: `Bearer ${getSiteApiKey()}` },
    // Freshness is handled by the unstable_cache wrapper around this call.
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Content API responded ${response.status}.`);
  }

  const payload = (await response.json()) as {
    content?: { pages?: Record<string, unknown> } & Record<string, unknown>;
  };

  if (!payload.content) {
    throw new Error("Content API returned no content.");
  }

  // The API only returns pages that exist in the database; fill the gaps from
  // the local default document so the site always has every page.
  const content = normalizeContent({
    ...payload.content,
    pages: {
      ...defaultWebsiteContent.pages,
      ...(payload.content.pages ?? {}),
    },
  });

  return {
    content,
    source: "api",
  };
}
