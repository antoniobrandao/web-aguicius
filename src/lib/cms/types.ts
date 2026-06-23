export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type CmsDocument<T> = {
  slug: string;
  frontmatter: T;
  body: string;
};

export type DocumentInput<T> = {
  frontmatter: T;
  body: string;
};

export class CmsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CmsError";
  }
}

export class CmsValidationError extends CmsError {
  readonly issues: unknown;

  constructor(message: string, issues?: unknown) {
    super(message);
    this.name = "CmsValidationError";
    this.issues = issues;
  }
}

export class CmsNotFoundError extends CmsError {
  constructor(message: string) {
    super(message);
    this.name = "CmsNotFoundError";
  }
}
