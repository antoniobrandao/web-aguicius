import { NextResponse } from "next/server";

import { quoteFormSchema, toFieldErrors } from "@/lib/leads/form-schemas";
import { submitLead, toLeadFieldErrors } from "@/lib/leads/submit-lead";

// Quote form endpoint. A thin proxy over the casadigital.pt Site API.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: bots fill every field; humans never see this one. Answering with a
  // success keeps them from probing further.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ success: true });
  }

  const parsed = quoteFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid form submission.",
        // Visitor-facing, so the form can show each one against its field.
        fieldErrors: toFieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const result = await submitLead({
    formType: "quote",
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    phone: parsed.data.phone || undefined,
    serviceSlug: parsed.data.service || undefined,
    originDestination: parsed.data["origin-destination"] || undefined,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to send your request.",
        // A 422 from the platform names the offending fields; put them back on
        // the form. Any other failure leaves the generic banner, which points the
        // visitor at the contact details shown beside the form.
        ...(result.reason === "rejected"
          ? {
              fieldErrors: toLeadFieldErrors(result.issues, {
                serviceSlug: "service",
                originDestination: "origin-destination",
              }),
            }
          : {}),
      },
      { status: result.reason === "rejected" ? 400 : 502 },
    );
  }

  return NextResponse.json({ success: true });
}
