"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

import type { ActionResult } from "@/lib/action-result";
import { WEBSITE_CONTENT_TAG } from "@/lib/content/cache";
import { seedDefaultWebsiteContent } from "@/lib/content/website-repository";

function toMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Não foi possível gravar o seed normalizado.";
}

export async function seedDefaultWebsiteContentAction(
  _prevState: ActionResult<null> | null,
  _formData: FormData,
): Promise<ActionResult<null>> {
  void _prevState;
  void _formData;

  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  try {
    await seedDefaultWebsiteContent();
    revalidateTag(WEBSITE_CONTENT_TAG, "max");
    revalidatePath("/data-admin");
    return { ok: true, data: null };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}
