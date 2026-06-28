import type { ObjectId } from "mongodb";

import type { WebsiteContent } from "./website-schema";

export type AguiciusWebsiteContent = WebsiteContent;

export type AguiciusWebsiteSnapshot = {
  _id?: ObjectId;
  content: AguiciusWebsiteContent;
  revision: number;
  createdAt: Date;
};

export type WebsiteContentSource = "mongo" | "default";

export type LoadedWebsiteContent = {
  content: AguiciusWebsiteContent;
  source: WebsiteContentSource;
  revision?: number;
  createdAt?: Date;
};
