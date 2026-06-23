import { z } from "zod";

import {
  assertSafeSlug,
  blobExists,
  deleteBlob,
  listBlobPathnames,
  readBlob,
  writeBlob,
} from "./blob-store";
import { parseMarkdown, serializeMarkdown } from "./markdown";
import {
  CmsValidationError,
  type CmsDocument,
  type DocumentInput,
} from "./types";

export type CollectionConfig<S extends z.ZodType> = {
  name: string;
  schema: S;
};

export type Collection<S extends z.ZodType> = {
  name: string;
  schema: S;
  get(slug: string): Promise<CmsDocument<z.infer<S>> | null>;
  list(): Promise<CmsDocument<z.infer<S>>[]>;
  upsert(
    slug: string,
    input: DocumentInput<z.input<S>>,
  ): Promise<CmsDocument<z.infer<S>>>;
  remove(slug: string): Promise<void>;
  exists(slug: string): Promise<boolean>;
};

const COLLECTION_NAME = /^[a-z0-9][a-z0-9-_/]*$/;

export function defineCollection<S extends z.ZodType>(
  config: CollectionConfig<S>,
): Collection<S> {
  type Output = z.infer<S>;

  if (!COLLECTION_NAME.test(config.name)) {
    throw new CmsValidationError(
      `Invalid collection name "${config.name}".`,
    );
  }

  const prefix = `${config.name}/`;
  const pathOf = (slug: string) => `${prefix}${slug}.md`;
  const slugOf = (pathname: string) =>
    pathname.slice(prefix.length, -".md".length);

  function validate(slug: string, data: unknown): Output {
    const result = config.schema.safeParse(data);
    if (!result.success) {
      throw new CmsValidationError(
        `Invalid frontmatter for "${config.name}/${slug}": ${z.prettifyError(
          result.error,
        )}`,
        result.error.issues,
      );
    }
    return result.data as Output;
  }

  async function get(slug: string): Promise<CmsDocument<Output> | null> {
    assertSafeSlug(slug);
    const raw = await readBlob(pathOf(slug));
    if (raw === null) return null;

    const { data, body } = parseMarkdown(raw);
    return {
      slug,
      frontmatter: validate(slug, data),
      body,
    };
  }

  async function list(): Promise<CmsDocument<Output>[]> {
    const pathnames = await listBlobPathnames(prefix);
    const slugs = pathnames
      .filter((pathname) => pathname.endsWith(".md"))
      .map(slugOf);

    const docs = await Promise.all(slugs.map((slug) => get(slug)));
    return docs.filter((doc): doc is CmsDocument<Output> => doc !== null);
  }

  async function upsert(
    slug: string,
    input: DocumentInput<z.input<S>>,
  ): Promise<CmsDocument<Output>> {
    assertSafeSlug(slug);
    const frontmatter = validate(slug, input.frontmatter);
    const contents = serializeMarkdown(
      frontmatter as Record<string, unknown>,
      input.body,
    );
    await writeBlob(pathOf(slug), contents);
    return { slug, frontmatter, body: input.body };
  }

  async function remove(slug: string): Promise<void> {
    assertSafeSlug(slug);
    await deleteBlob(pathOf(slug));
  }

  async function exists(slug: string): Promise<boolean> {
    assertSafeSlug(slug);
    return blobExists(pathOf(slug));
  }

  return {
    name: config.name,
    schema: config.schema,
    get,
    list,
    upsert,
    remove,
    exists,
  };
}
