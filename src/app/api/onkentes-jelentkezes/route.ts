import { NextResponse } from "next/server";
import { isValidEmail, requireFields } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const missing = requireFields(body, ["name", "email", "helpType"]);

  if (missing.length > 0) {
    return NextResponse.json({ ok: false, error: "Hiányzó kötelező mezők.", fields: missing }, { status: 400 });
  }
  if (!isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Érvénytelen e-mail cím." }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "Köszönjük a jelentkezésedet, hamarosan jelentkezünk!" });
}
