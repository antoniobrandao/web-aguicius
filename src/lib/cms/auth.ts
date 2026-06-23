import { CmsError } from "./types";

export type AuthContext = {
  ok: boolean;
};

export type Authorizer = () => Promise<AuthContext> | AuthContext;

const defaultAuthorizer: Authorizer = () => ({ ok: true });

let authorizer: Authorizer = defaultAuthorizer;

export function setAuthorizer(fn: Authorizer): void {
  authorizer = fn;
}

export function resetAuthorizer(): void {
  authorizer = defaultAuthorizer;
}

export async function ensureAuthorized(): Promise<AuthContext> {
  const ctx = await authorizer();
  if (!ctx.ok) {
    throw new CmsError("Unauthorized.");
  }
  return ctx;
}
