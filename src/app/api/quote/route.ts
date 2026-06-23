import { NextResponse } from "next/server";

import { getServiceGroups } from "@/lib/content/adapters";
import { getWebsiteContent } from "@/lib/content/website-content";

type QuotePayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  "origin-destination"?: string;
  message?: string;
};

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_API_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: "Form service is not configured." },
      { status: 500 },
    );
  }

  let body: QuotePayload;
  try {
    body = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
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

  const { content } = await getWebsiteContent();
  const { allServices } = getServiceGroups(content);
  const serviceTitle =
    allServices.find((service) => service.slug === body.service)?.title ??
    body.service ??
    "";

  const web3Response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: "Novo pedido de orcamento - Aguicius",
      from_name: "Aguicius - Website",
      name,
      email,
      phone: body.phone?.trim() ?? "",
      service: serviceTitle,
      "Recolha / Entrega": body["origin-destination"]?.trim() ?? "",
      message,
    }),
  });

  const result = (await web3Response.json().catch(() => null)) as
    | { success?: boolean }
    | null;

  if (!web3Response.ok || !result?.success) {
    return NextResponse.json(
      { success: false, message: "Unable to send your request." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
