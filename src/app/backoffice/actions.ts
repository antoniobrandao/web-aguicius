"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { ActionResult } from "@/lib/action-result";
import {
  assertBackofficeAuthenticated,
  clearBackofficeSession,
  createBackofficeSession,
  isValidBackofficePassword,
} from "@/lib/backoffice/auth";
import { writeFileBlob } from "@/lib/blob/storage";
import { saveWebsiteContent } from "@/lib/content/website-content";
import {
  websiteContentSchema,
  type WebsiteContent,
} from "@/lib/content/website-schema";

const PUBLIC_PATHS = [
  "/",
  "/sobre-nos",
  "/servicos",
  "/contactos",
  "/orcamento",
  "/termos",
  "/privacidade",
];

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

export async function saveBackofficeContent(
  content: WebsiteContent,
): Promise<ActionResult<WebsiteContent>> {
  try {
    await assertBackofficeAuthenticated();
    const parsed = websiteContentSchema.parse(content);
    const saved = await saveWebsiteContent(parsed);

    for (const pathname of PUBLIC_PATHS) {
      revalidatePath(pathname);
    }

    return { ok: true, data: saved };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}

export async function uploadServiceImage(
  formData: FormData,
): Promise<ActionResult<{ pathname: string }>> {
  try {
    await assertBackofficeAuthenticated();

    const slug = String(formData.get("slug") ?? "");
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
    const result = await writeFileBlob(pathname, file, file.type);
    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: toMessage(error) };
  }
}
