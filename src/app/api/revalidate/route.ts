import { revalidateTag } from "next/cache";

import { WEBSITE_CONTENT_TAG } from "@/lib/content/cache";

// Called by the external backoffice after saving content so the public site
// picks up the new data from MongoDB.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(WEBSITE_CONTENT_TAG, "max");

  return Response.json({ revalidated: true, tag: WEBSITE_CONTENT_TAG });
}
