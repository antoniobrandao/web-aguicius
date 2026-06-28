"use server";

import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { seedDefaultWebsiteContent } from "@/lib/content/website-repository";

export async function seedDefaultWebsiteContentAction() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  await seedDefaultWebsiteContent();
  revalidatePath("/data-admin");
}
