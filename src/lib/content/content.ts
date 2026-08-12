import { unstable_cache } from "next/cache";

import {
  fetchLocations,
  fetchNavigation,
  fetchPage,
  fetchServices,
  fetchSettings,
  fetchValues,
} from "./api";
import { pageTag } from "./cache";
import { PAGE_KEYS, type PageKey } from "./constants";
import {
  emptyNavigation,
  emptyPage,
  emptySettings,
  type LocationContent,
  type Navigation,
  type PageContent,
  type ServiceContent,
  type Settings,
  type ValueContent,
} from "./resources";

// Cached, per-resource reads. Each resource has its own cache tag so a change to
// one does not invalidate the others, plus a slow interval as a safety net in case
// an invalidation push from the backoffice is missed.
//
// An unavailable resource degrades to its empty value instead of throwing. A new
// site with no content yet and a temporarily unreachable platform look identical
// from here, and both must leave the site standing. The error is always logged,
// because in production either case is a real problem worth investigating.

const FALLBACK_REVALIDATE_SECONDS = 300;

function cachedResource<T>(
  resource: string,
  keyParts: string[],
  tags: string[],
  load: () => Promise<T>,
  empty: () => T,
) {
  return unstable_cache(
    async () => {
      try {
        return await load();
      } catch (error) {
        console.error(
          `[content] ${resource} unavailable, rendering empty state:`,
          error instanceof Error ? error.message : error,
        );
        return empty();
      }
    },
    keyParts,
    { tags, revalidate: FALLBACK_REVALIDATE_SECONDS },
  );
}

const noItems = <T>(): T[] => [];

const readSettings = cachedResource(
  "settings",
  ["settings"],
  ["settings"],
  fetchSettings,
  emptySettings,
);

const readNavigation = cachedResource(
  "navigation",
  ["navigation"],
  ["navigation"],
  fetchNavigation,
  emptyNavigation,
);

const readServices = cachedResource(
  "services",
  ["services"],
  ["services"],
  fetchServices,
  noItems<ServiceContent>,
);

const readLocations = cachedResource(
  "locations",
  ["locations"],
  ["locations"],
  fetchLocations,
  noItems<LocationContent>,
);

const readValues = cachedResource(
  "values",
  ["values"],
  ["values"],
  fetchValues,
  noItems<ValueContent>,
);

// Pages are cached per key and tagged twice, so the backoffice can invalidate a
// single page or every page at once. Built once at module load rather than per
// call, so each page key keeps a stable cache entry.
const readPage = Object.fromEntries(
  PAGE_KEYS.map((pageKey) => [
    pageKey,
    cachedResource(
      `page "${pageKey}"`,
      ["page", pageKey],
      ["pages", pageTag(pageKey)],
      () => fetchPage(pageKey),
      emptyPage,
    ),
  ]),
) as Record<PageKey, () => Promise<PageContent>>;

export function getSettings(): Promise<Settings> {
  return readSettings();
}

export function getNavigation(): Promise<Navigation> {
  return readNavigation();
}

export function getServices(): Promise<ServiceContent[]> {
  return readServices();
}

export function getLocations(): Promise<LocationContent[]> {
  return readLocations();
}

export function getValues(): Promise<ValueContent[]> {
  return readValues();
}

export function getPage(pageKey: PageKey): Promise<PageContent> {
  return readPage[pageKey]();
}
