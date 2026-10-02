import { revalidateTag } from "next/cache";

import { CONTENT_TAGS, isContentTag } from "@/lib/content/cache";

// Invalidation endpoint for the casadigital backoffice: after a content save it
// posts the resources it changed, so only those caches are dropped. Unknown tags
// are rejected rather than ignored, otherwise a typo on the platform side would
// look like a silent success while the site kept serving stale content.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const requested = (body as { tags?: unknown })?.tags;

  if (!Array.isArray(requested) || requested.length === 0) {
    return Response.json(
      { error: `Send { "tags": [...] } with one or more of: ${CONTENT_TAGS.join(", ")}.` },
      { status: 400 },
    );
  }

  const unknown = requested.filter((tag) => !isContentTag(tag));

  if (unknown.length) {
    return Response.json(
      {
        error: `Unknown tag(s): ${unknown.join(", ")}. Known tags: ${CONTENT_TAGS.join(", ")}.`,
      },
      { status: 400 },
    );
  }

  const tags = [...new Set(requested.filter(isContentTag))];

  for (const tag of tags) {
    // Expire immediately: the push means the content already changed, and the
    // default "max" profile would serve the stale copy once more first.
    revalidateTag(tag, { expire: 0 });
  }

  return Response.json({ revalidated: true, tags });
}
