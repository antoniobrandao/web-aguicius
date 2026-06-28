import type { ObjectId } from "mongodb";
import type { LucideIcon } from "lucide-react";

import type { WebsiteContent } from "./website-schema";

export type AguiciusWebsiteContent = WebsiteContent;

export type SiteSettings = Omit<
  AguiciusWebsiteContent["site"],
  "appUrl" | "seo"
> & {
  app: string;
};

export type NavItem = AguiciusWebsiteContent["navigation"]["header"][number];

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  image?: {
    pathname?: string;
    alt: string;
  };
  short: string;
  description: string;
  bullets?: string[];
};

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
