import type { LucideIcon } from "lucide-react";

import type { LocationContent, Settings } from "./resources";

// View-layer types. Components depend on these rather than on where the data came
// from, so a section reads the same whether its copy is business data from the
// Site API or design copy from this repo.

export type Cta = {
  label: string;
  href: string;
};

export type SectionIntro = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export type FormCopy = {
  submitLabel: string;
  submittingLabel: string;
  success: { title: string; description: string; resetLabel: string };
  error: string;
};

export type SiteSettings = Omit<Settings, "appUrl"> & {
  app: string;
  /** `tel:` URI derived from `phone`; empty when there is no number to call. */
  phoneHref: string;
};

export type NavItem = {
  label: string;
  href: string;
  cta?: boolean;
};

export type SiteLocation = LocationContent;

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  image?: {
    assetId?: string;
    url?: string;
    alt: string;
    width?: number;
    height?: number;
  };
  short: string;
  description: string;
  bullets?: string[];
};
