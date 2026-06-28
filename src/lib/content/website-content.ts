import { defaultWebsiteContent } from "@/content/default-website";

import {
  getLatestWebsiteContent,
  saveWebsiteContentSnapshot,
} from "./website-repository";
import type {
  AguiciusWebsiteContent,
  LoadedWebsiteContent,
} from "./website-types";

export async function getWebsiteContent(): Promise<LoadedWebsiteContent> {
  try {
    return await getLatestWebsiteContent();
  } catch {
    // Keep the public site up if MongoDB is unavailable during local work.
    return {
      content: defaultWebsiteContent,
      source: "default",
    };
  }
}

export async function saveWebsiteContent(
  content: AguiciusWebsiteContent,
): Promise<AguiciusWebsiteContent> {
  const saved = await saveWebsiteContentSnapshot(content);
  return saved.content;
}
