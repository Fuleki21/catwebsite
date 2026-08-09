import { NextResponse } from "next/server";
import { isValidEmail, requireFields } from "@/lib/validation";
import { sendFormNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const missing = requireFields(body, ["name", "email", "phone", "availableFrom"]);

  if (missing.length > 0) {
    return NextResponse.json({ ok: false, error: "Hiányzó kötelező mezők.", fields: missing }, { status: 400 });
  }
  if (!isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Érvénytelen e-mail cím." }, { status: 400 });
  }

  await sendFormNotification("Új ideiglenes befogadó jelentkezés", {
    Név: body.name,
    "E-mail": body.email,
    Telefon: body.phone,
    "Mettől ér rá": body.availableFrom,
    "Lakáskörülmények": body.livingSituation,
    Megjegyzés: body.message,
  });

  return NextResponse.json({ ok: true, message: "Köszönjük! Hamarosan felvesszük veled a kapcsolatot." });
}
