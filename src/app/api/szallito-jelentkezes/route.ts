import { NextResponse } from "next/server";
import { isValidEmail, requireFields } from "@/lib/validation";
import { sendFormNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const missing = requireFields(body, ["name", "email", "phone", "area"]);

  if (missing.length > 0) {
    return NextResponse.json({ ok: false, error: "Hiányzó kötelező mezők.", fields: missing }, { status: 400 });
  }
  if (!isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Érvénytelen e-mail cím." }, { status: 400 });
  }

  await sendFormNotification("Új szállító jelentkezés", {
    Név: body.name,
    "E-mail": body.email,
    Telefon: body.phone,
    Terület: body.area,
    "Mikor ér rá": body.message,
  });

  return NextResponse.json({ ok: true, message: "Köszönjük! Hamarosan jelentkezünk egy szállítási feladattal." });
}
