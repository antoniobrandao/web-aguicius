import matter from "gray-matter";

export type ParsedMarkdown = {
  data: Record<string, unknown>;
  body: string;
};

export function parseMarkdown(raw: string): ParsedMarkdown {
  const parsed = matter(raw);
  return {
    data: parsed.data as Record<string, unknown>,
    body: parsed.content,
  };
}

export function serializeMarkdown(
  frontmatter: Record<string, unknown>,
  body: string,
): string {
  return matter.stringify(body, frontmatter);
}
