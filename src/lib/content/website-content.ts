import { readFile } from "node:fs/promises";
import path from "node:path";

import { defineCollection, parseMarkdown } from "@/lib/cms";

import {
  websiteContentSchema,
  type WebsiteContent,
} from "./website-schema";

export const WEBSITE_COLLECTION_NAME = "website";
export const WEBSITE_DOCUMENT_SLUG = "content";
export const WEBSITE_BLOB_PATHNAME = "website/content.md";

export type WebsiteContentSource = "blob" | "fallback";

export type LoadedWebsiteContent = {
  content: WebsiteContent;
  source: WebsiteContentSource;
};

export const websiteCollection = defineCollection({
  name: WEBSITE_COLLECTION_NAME,
  schema: websiteContentSchema,
});

function withContentDefaults(data: unknown): unknown {
  if (!data || typeof data !== "object") return data;

  const content = data as {
    services?: Array<{ title?: string; image?: unknown }>;
  };

  return {
    ...content,
    services: content.services?.map((service) => ({
      ...service,
      image:
        service.image && typeof service.image === "object"
          ? service.image
          : { alt: service.title ? `${service.title} Aguicius` : "Serviço Aguicius" },
    })),
  };
}

async function readFallbackContent(): Promise<WebsiteContent> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "default-website.md",
  );
  const raw = await readFile(filePath, "utf8");
  const parsed = parseMarkdown(raw);
  return websiteContentSchema.parse(withContentDefaults(parsed.data));
}

export async function getWebsiteContent(): Promise<LoadedWebsiteContent> {
  try {
    const document = await websiteCollection.get(WEBSITE_DOCUMENT_SLUG);
    if (document) {
      return {
        content: websiteContentSchema.parse(
          withContentDefaults(document.frontmatter),
        ),
        source: "blob",
      };
    }
  } catch {
    // Local development can run without a Blob RW token. Keep the public site up.
  }

  return {
    content: await readFallbackContent(),
    source: "fallback",
  };
}

export async function saveWebsiteContent(
  content: WebsiteContent,
): Promise<WebsiteContent> {
  const parsed = websiteContentSchema.parse(content);
  const document = await websiteCollection.upsert(WEBSITE_DOCUMENT_SLUG, {
    frontmatter: parsed,
    body: "Conteúdo principal do website Aguicius.",
  });
  return document.frontmatter;
}
