"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import type { ActionResult } from "@/lib/action-result";
import {
  assertBackofficeAuthenticated,
  clearBackofficeSession,
  createBackofficeSession,
  isValidBackofficePassword,
} from "@/lib/backoffice/auth";
import { uploadAsset } from "@/lib/assets/upload";
import { WEBSITE_CONTENT_TAG } from "@/lib/content/cache";
import { PAGE_KEYS } from "@/lib/content/constants";
import {
  deleteLocationDocument,
  deleteServiceDocument,
  saveLocationDocument,
  saveNavigationDocument,
  savePageDocument,
  saveServiceDocument,
  saveWebsiteSettingsDocument,
} from "@/lib/content/website-repository";
import {
  websiteContentSchema,
  type WebsiteContent,
} from "@/lib/content/website-schema";

function toMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Não foi possível concluir a operação.";
}

function fileExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName;

  const fromType = file.type.split("/").pop()?.toLowerCase();
  return fromType && /^[a-z0-9]+$/.test(fromType) ? fromType : "bin";
}

export async function loginBackoffice(
  _prevState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> {
  const password = String(formData.get("password") ?? "");

  if (!password || !isValidBackofficePassword(password)) {
    return { ok: false, error: "Palavra-passe inválida." };
  }

  await createBackofficeSession();
  redirect("/backoffice");
}

export async function logoutBackoffice(): Promise<void> {
  await clearBackofficeSession();
  redirect("/backoffice/login");
}

export async function saveWebsiteSection(input: {
  site: WebsiteContent["site"];
  values: WebsiteContent["values"];
}) {
  try {
    await assertBackofficeAuthenticated();
    const parsed = websiteContentSchema
      .pick({ site: true, values: true })
      .parse(input);
    await saveWebsiteSettingsDocument(parsed);
    revalidateTag(WEBSITE_CONTENT_TAG, "max");
    return { ok: true, data: parsed };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}

export async function saveNavigationSection(
  navigation: WebsiteContent["navigation"],
) {
  try {
    await assertBackofficeAuthenticated();
    const parsed = websiteContentSchema.shape.navigation.parse(navigation);
    await saveNavigationDocument(parsed);
    revalidateTag(WEBSITE_CONTENT_TAG, "max");
    return { ok: true, data: parsed };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}

export async function savePageAction<K extends (typeof PAGE_KEYS)[number]>(
  pageKey: K,
  page: WebsiteContent["pages"][K],
) {
  try {
    await assertBackofficeAuthenticated();
    const parsed = websiteContentSchema.shape.pages.shape[pageKey].parse(page);
    await savePageDocument(pageKey, parsed);
    revalidateTag(WEBSITE_CONTENT_TAG, "max");
    return { ok: true, data: parsed };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}

export async function saveLocationAction(
  input: {
    originalSlug?: string;
    location: WebsiteContent["locations"][number];
  },
) {
  try {
    await assertBackofficeAuthenticated();
    const parsed = websiteContentSchema.shape.locations.element.parse(
      input.location,
    );
    await saveLocationDocument({ originalSlug: input.originalSlug, location: parsed });
    revalidateTag(WEBSITE_CONTENT_TAG, "max");
    return { ok: true, data: parsed };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}

export async function deleteLocationAction(slug: string) {
  try {
    await assertBackofficeAuthenticated();
    await deleteLocationDocument(slug);
    revalidateTag(WEBSITE_CONTENT_TAG, "max");
    return { ok: true, data: null };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}

export async function saveServiceAction(input: {
  originalSlug?: string;
  service: WebsiteContent["services"][number];
}) {
  try {
    await assertBackofficeAuthenticated();
    const parsed = websiteContentSchema.shape.services.element.parse(
      input.service,
    );
    await saveServiceDocument({ originalSlug: input.originalSlug, service: parsed });
    revalidateTag(WEBSITE_CONTENT_TAG, "max");
    return { ok: true, data: parsed };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}

export async function deleteServiceAction(slug: string) {
  try {
    await assertBackofficeAuthenticated();
    await deleteServiceDocument(slug);
    revalidateTag(WEBSITE_CONTENT_TAG, "max");
    return { ok: true, data: null };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}

export async function uploadServiceImage(
  formData: FormData,
): Promise<
  ActionResult<{
    assetId: string;
    pathname: string;
    width?: number;
    height?: number;
  }>
> {
  try {
    await assertBackofficeAuthenticated();

    const slug = String(formData.get("slug") ?? "");
    const alt = String(formData.get("alt") ?? "");
    const widthValue = Number(formData.get("width") ?? 0);
    const heightValue = Number(formData.get("height") ?? 0);
    const file = formData.get("file");

    if (!/^[a-z0-9][a-z0-9-_]*$/.test(slug)) {
      return { ok: false, error: "Slug de serviço inválido." };
    }

    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: "Escolha uma imagem para carregar." };
    }

    if (!file.type.startsWith("image/")) {
      return { ok: false, error: "O ficheiro tem de ser uma imagem." };
    }

    const pathname = `services/${slug}/image.${fileExtension(file)}`;
    const asset = await uploadAsset({
      file,
      pathname,
      alt,
      width: widthValue > 0 ? widthValue : undefined,
      height: heightValue > 0 ? heightValue : undefined,
    });

    return {
      ok: true,
      data: {
        assetId: asset.assetId,
        pathname: asset.pathname,
        width: asset.width,
        height: asset.height,
      },
    };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}
