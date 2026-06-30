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
    assetId?: string;
    pathname?: string;
    alt: string;
    width?: number;
    height?: number;
  };
  short: string;
  description: string;
  bullets?: string[];
};

export type WebsiteContentSource = "mongo" | "default";

export type LoadedWebsiteContent = {
  content: AguiciusWebsiteContent;
  source: WebsiteContentSource;
};
