import { getApiBaseUrl, getSiteApiKey } from "@/lib/content/api";

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

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; reason: "rejected" | "unavailable" };

export async function submitLead(lead: LeadInput): Promise<SubmitLeadResult> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/leads`, {
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

    console.error(`[leads] Leads API responded ${response.status}.`);

    // The API answers 422 when the payload fails its own validation, which the
    // visitor can fix. Anything else is ours to fix, not theirs.
    return {
      ok: false,
      reason: response.status === 422 ? "rejected" : "unavailable",
    };
  } catch (error) {
    console.error("[leads] Could not reach the leads API:", error);
    return { ok: false, reason: "unavailable" };
  }
}
