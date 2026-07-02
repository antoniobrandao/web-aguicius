import { NextResponse } from "next/server";

import {
  getApiBaseUrl,
  getSiteApiKey,
} from "@/lib/content/website-repository";

type QuotePayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  "origin-destination"?: string;
  message?: string;
  website?: string; // honeypot
};

// Thin proxy: this site never talks to the database. Leads are created
// through the casadigital.pt Site API, which also notifies the tenant.
export async function POST(request: Request) {
  let body: QuotePayload;
  try {
    body = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: bots fill every field; humans never see this one.
  if (body.website?.trim()) {
    return NextResponse.json({ success: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: "Missing required fields." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getSiteApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        phone: body.phone?.trim() || undefined,
        serviceSlug: body.service?.trim() || undefined,
        originDestination: body["origin-destination"]?.trim() || undefined,
      }),
    });

    if (!response.ok) {
      console.error(`[quote] Leads API responded ${response.status}.`);
      return NextResponse.json(
        { success: false, message: "Unable to send your request." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[quote] Could not reach the leads API:", error);
    return NextResponse.json(
      { success: false, message: "Unable to send your request." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
