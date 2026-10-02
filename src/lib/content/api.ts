import type { z } from "zod";

import {
  legalSchema,
  locationsSchema,
  servicesSchema,
  settingsSchema,
  valuesSchema,
  type Legal,
  type LocationContent,
  type ServiceContent,
  type Settings,
  type ValueContent,
} from "./resources";

// This site is a pure view: all content lives in the casadigital database and is
// read one resource at a time through its Site API, authenticated with this
// site's API key. Nothing here is cached — see content.ts for that.

// The contract major version this site was built against. A mismatch means the
// platform changed shape underneath us and the payload can no longer be trusted.
const EXPECTED_CONTRACT_MAJOR = "6";

const REQUEST_TIMEOUT_MS = 5_000;

// The platform origin from the contract. The bare domain 308-redirects here, and
// fetch drops the Authorization header on a cross-origin redirect, so every
// request to it would come back 401.
export const API_BASE_URL = "https://www.casadigital.pt";

export function getSiteApiKey() {
  const apiKey = process.env.SITE_API_KEY;

  if (!apiKey) {
    throw new Error("SITE_API_KEY is not set.");
  }

  return apiKey;
}

function assertContractVersion(version: unknown, path: string) {
  if (typeof version !== "string") {
    console.error(
      `[content] ${path} returned no contract version; this site expects ${EXPECTED_CONTRACT_MAJOR}.x.`,
    );
    return;
  }

  const major = version.split(".")[0];
  if (major !== EXPECTED_CONTRACT_MAJOR) {
    console.error(
      `[content] ${path} returned contract version ${version}, but this site expects ${EXPECTED_CONTRACT_MAJOR}.x. Update the content schemas.`,
    );
  }
}

/**
 * Reads one resource from the Site API and validates it against the local
 * contract. Throws on transport, status or validation failure; callers decide
 * what an unavailable resource means for the page.
 */
async function fetchResource<Schema extends z.ZodType>(
  path: string,
  key: string,
  schema: Schema,
): Promise<z.infer<Schema>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${getSiteApiKey()}` },
    // Freshness is owned by the cache wrappers in content.ts.
    cache: "no-store",
    // Without this a hung platform blocks the render until the function times
    // out, which would defeat the empty-state fallback.
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`${path} responded ${response.status}.`);
  }

  const payload = (await response.json()) as Record<string, unknown>;
  assertContractVersion(payload.version, path);

  return schema.parse(payload[key]) as z.infer<Schema>;
}

export function fetchSettings(): Promise<Settings> {
  return fetchResource("/api/v1/settings", "settings", settingsSchema);
}

export function fetchServices(): Promise<ServiceContent[]> {
  return fetchResource("/api/v1/services", "services", servicesSchema);
}

export function fetchLocations(): Promise<LocationContent[]> {
  return fetchResource("/api/v1/locations", "locations", locationsSchema);
}

export function fetchValues(): Promise<ValueContent[]> {
  return fetchResource("/api/v1/values", "values", valuesSchema);
}

export function fetchLegal(): Promise<Legal> {
  return fetchResource("/api/v1/legal", "legal", legalSchema);
}
