import { unstable_cache } from "next/cache";

import {
  fetchLegal,
  fetchLocations,
  fetchServices,
  fetchSettings,
  fetchValues,
} from "./api";
import {
  emptyLegal,
  emptySettings,
  type Legal,
  type LocationContent,
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

const readLegal = cachedResource("legal", ["legal"], ["legal"], fetchLegal, emptyLegal);

export function getSettings(): Promise<Settings> {
  return readSettings();
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

export function getLegal(): Promise<Legal> {
  return readLegal();
}
