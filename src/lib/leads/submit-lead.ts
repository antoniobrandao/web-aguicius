import { API_BASE_URL, getSiteApiKey } from "@/lib/content/api";

// This site never talks to the database: every form creates its lead through the
// casadigital Site API, which also notifies the tenant. The form the visitor used
// travels with the lead so the dashboard can tell a quote request from a message.

const REQUEST_TIMEOUT_MS = 5_000;

export type LeadFormType = "quote" | "contact";

export type LeadInput = {
  formType: LeadFormType;
  name: string;
  email: string;
  message: string;
  phone?: string;
  serviceSlug?: string;
  originDestination?: string;
};

export type LeadIssue = { path: string; message: string };

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; reason: "rejected"; issues: LeadIssue[] }
  | { ok: false; reason: "crm_inactive" | "unavailable" };

export async function submitLead(lead: LeadInput): Promise<SubmitLeadResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getSiteApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (response.ok) {
      return { ok: true };
    }

    const body = (await response.json().catch(() => null)) as {
      code?: string;
      issues?: unknown;
    } | null;

    // The account has no active CRM, so the platform stores nothing. Retrying
    // cannot help; the business has to turn its CRM back on, so say so loudly.
    if (response.status === 403 && body?.code === "crm_inactive") {
      console.error(
        "[leads] Lead NOT stored: this Casa Digital account has no active CRM (403 crm_inactive). Every form submission is being lost until the CRM is reactivated in the backoffice.",
      );
      return { ok: false, reason: "crm_inactive" };
    }

    console.error(`[leads] Leads API responded ${response.status}.`);

    // The API answers 422 when the payload fails its own validation, which the
    // visitor can fix. Anything else is ours to fix, not theirs.
    if (response.status === 422) {
      return { ok: false, reason: "rejected", issues: toIssues(body?.issues) };
    }

    return { ok: false, reason: "unavailable" };
  } catch (error) {
    console.error("[leads] Could not reach the leads API:", error);
    return { ok: false, reason: "unavailable" };
  }
}

function toIssues(value: unknown): LeadIssue[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((issue) => {
    const { path, message } = (issue ?? {}) as { path?: unknown; message?: unknown };
    const field = Array.isArray(path) ? path.join(".") : path;

    return typeof field === "string" && typeof message === "string"
      ? [{ path: field, message }]
      : [];
  });
}

/**
 * Maps the platform's 422 issues back onto this site's form controls, whose names
 * differ from the API payload where the route renames them. Issues on a field the
 * form does not have are dropped; the caller falls back to the generic banner.
 */
export function toLeadFieldErrors(
  issues: LeadIssue[],
  fieldNames: Partial<Record<keyof LeadInput, string>> = {},
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  for (const { path, message } of issues) {
    const field = fieldNames[path as keyof LeadInput] ?? path;
    if (!(field in fieldErrors)) fieldErrors[field] = message;
  }

  return fieldErrors;
}
