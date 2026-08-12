import type { Metadata } from "next";

import { siteMeta } from "@/content/site";

import { getSettings } from "./content";

// Metadata is composed from two sources, each owning what it should.
//
// The business identity — name, tagline, description — comes from the company
// record the client maintains in the dashboard. Renaming the business or
// rewording its description updates every page's metadata without a deploy.
//
// Page names stay in this repository, because which pages exist and what they are
// called is a property of the website, not of the business.

type BusinessIdentity = {
  name: string;
  tagline: string;
  description: string;
};

async function getBusinessIdentity(): Promise<BusinessIdentity> {
  const settings = await getSettings();

  return {
    name: settings.name.trim() || siteMeta.fallbackName,
    tagline: settings.tagline.trim() || siteMeta.fallbackTagline,
    description: settings.description.trim() || siteMeta.fallbackDescription,
  };
}

/**
 * Root metadata: the business name and tagline title the site, and every child
 * page's title is suffixed with the business name through the template.
 */
export async function buildRootMetadata(): Promise<Metadata> {
  const { name, tagline, description } = await getBusinessIdentity();

  return {
    metadataBase: new URL(siteMeta.url),
    title: {
      default: tagline ? `${name} — ${tagline}` : name,
      template: `${name} — %s`,
    },
    description,
  };
}

/**
 * Page metadata: the page's own name, and its own description when it has one.
 * A page with no description falls back to the business description rather than
 * inheriting nothing.
 *
 * The title goes through the root template, so returning the bare page name here
 * produces "Business — Page".
 */
export async function buildPageMetadata(page: {
  title: string;
  description: string;
}): Promise<Metadata> {
  const { description } = await getBusinessIdentity();

  return {
    // An empty title lets the root default stand, which is what the home page wants.
    ...(page.title.trim() ? { title: page.title } : {}),
    description: page.description.trim() || description,
  };
}
