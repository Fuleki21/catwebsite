export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function requireFields<T extends Record<string, unknown>>(
  body: T,
  fields: (keyof T)[]
): string[] {
  const missing: string[] = [];
  for (const field of fields) {
    const value = body[field];
    if (typeof value === "string" && value.trim() === "") {
      missing.push(String(field));
    }
    if (value === undefined || value === null) {
      missing.push(String(field));
    }
  }
  return Array.from(new Set(missing));
}
