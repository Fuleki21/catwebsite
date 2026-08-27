// Egyszerű, jelszó-alapú admin session kezelés. Web Crypto API-t használ
// (crypto.subtle), ami Node.js-ben ÉS Next.js Edge Middleware-ben is elérhető,
// így ugyanez a kód mindkét helyen működik.

export const ADMIN_SESSION_COOKIE = "ctf_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 nap

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("Hiányzik az ADMIN_PASSWORD env változó.");
  return secret;
}

async function hmac(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/** Bejelentkezéskor: jelszó ellenőrzése az ADMIN_PASSWORD env változó ellen. */
export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !input) return false;
  return timingSafeEqual(input, expected);
}

/** Sikeres bejelentkezés után: aláírt, lejárati idős session token létrehozása. */
export async function createSessionToken(): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const signature = await hmac(String(expires), getSecret());
  return `${expires}.${signature}`;
}

/** Middleware / szerver oldalon: a cookie-ban tárolt token ellenőrzése. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [expiresStr, signature] = token.split(".");
  if (!expiresStr || !signature) return false;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) return false;
  try {
    const expected = await hmac(expiresStr, getSecret());
    return timingSafeEqual(expected, signature);
  } catch {
    return false;
  }
}

export const ADMIN_SESSION_MAX_AGE = SESSION_DURATION_SECONDS;
