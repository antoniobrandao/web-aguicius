import type { z } from "zod";

import { ensureAuthorized } from "./auth";
import type { Collection } from "./collection";
import { CmsError, type ActionResult, type CmsDocument, type DocumentInput } from "./types";

/**
 * NOTE: This module intentionally does NOT carry the `"use server"` directive.
 * A `"use server"` file may only export async functions, which is incompatible
 * with a factory that returns an object of actions. The content-specific layer
 * wires these into real Server Actions, e.g.:
 *
 *   "use server";
 *   import { createCollectionActions } from "@/lib/cms";
 *   const actions = createCollectionActions(myCollection, { revalidate });
 *   export const save = actions.save;
 *   export const destroy = actions.destroy;
 */

export type CollectionActionsOptions = {
  /** Called after a successful write/delete so callers can revalidate caches. */
  revalidate?: (slug: string) => void | Promise<void>;
};

export type CollectionActions<S extends z.ZodType> = {
  save(
    slug: string,
    input: DocumentInput<z.input<S>>,
  ): Promise<ActionResult<CmsDocument<z.infer<S>>>>;
  destroy(slug: string): Promise<ActionResult<null>>;
};

function toMessage(error: unknown): string {
  if (error instanceof CmsError) return error.message;
  if (error instanceof Error) return error.message;
  return "Unexpected error.";
}

export function createCollectionActions<S extends z.ZodType>(
  collection: Collection<S>,
  options: CollectionActionsOptions = {},
): CollectionActions<S> {
  async function save(
    slug: string,
    input: DocumentInput<z.input<S>>,
  ): Promise<ActionResult<CmsDocument<z.infer<S>>>> {
    try {
      await ensureAuthorized();
      const data = await collection.upsert(slug, input);
      await options.revalidate?.(slug);
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: toMessage(error) };
    }
  }

  async function destroy(slug: string): Promise<ActionResult<null>> {
    try {
      await ensureAuthorized();
      await collection.remove(slug);
      await options.revalidate?.(slug);
      return { ok: true, data: null };
    } catch (error) {
      return { ok: false, error: toMessage(error) };
    }
  }

  return { save, destroy };
}
