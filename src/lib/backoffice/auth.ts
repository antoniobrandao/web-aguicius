import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const COOKIE_NAME = "aguicius_backoffice";
const COOKIE_MAX_AGE = 60 * 60 * 8;

function getPassword(): string {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    throw new Error("DASHBOARD_PASSWORD não está configurada.");
  }
  return password;
}

function sessionValue(): string {
  return createHash("sha256")
    .update(`aguicius-backoffice:${getPassword()}`)
    .digest("hex");
}

function matchesSession(value?: string): boolean {
  if (!value) return false;
  const expected = sessionValue();
  const receivedBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  if (receivedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function isBackofficeAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return matchesSession(cookieStore.get(COOKIE_NAME)?.value);
}

export async function assertBackofficeAuthenticated(): Promise<void> {
  if (!(await isBackofficeAuthenticated())) {
    throw new Error("Sessão inválida. Inicie sessão novamente.");
  }
}

export async function createBackofficeSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/backoffice",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearBackofficeSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function isValidBackofficePassword(password: string): boolean {
  const expected = getPassword();
  const receivedBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  if (receivedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(receivedBuffer, expectedBuffer);
}
