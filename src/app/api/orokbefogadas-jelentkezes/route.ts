import { NextResponse } from "next/server";
import { isValidEmail, requireFields } from "@/lib/validation";
import { sendFormNotification } from "@/lib/email";

// Ez a route validál, e-mail értesítést küld a szervezetnek, és visszaigazol —
// adatbázisba egyelőre nem ír. Amint elkészül a CMS/Supabase integráció, itt
// kell majd beszúrni az "AdoptionApplication" rekordot is.
export async function POST(request: Request) {
  const body = await request.json();

  const missing = requireFields(body, [
    "name",
    "email",
    "phone",
    "address",
    "catSlug",
    "livingSituation",
    "motivation",
  ]);

  if (missing.length > 0) {
    return NextResponse.json({ ok: false, error: "Hiányzó kötelező mezők.", fields: missing }, { status: 400 });
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Érvénytelen e-mail cím." }, { status: 400 });
  }

  await sendFormNotification("Új örökbefogadási jelentkezés", {
    Név: body.name,
    "E-mail": body.email,
    Telefon: body.phone,
    Lakhely: body.address,
    "Melyik cica": body.catSlug,
    "Lakáskörülmények": body.livingSituation,
    "Van másik állat": body.hasOtherPets ? `igen — ${body.otherPetsDetails ?? ""}` : "nem",
    "Van gyermek": body.hasChildren ? `igen — ${body.childrenDetails ?? ""}` : "nem",
    Motiváció: body.motivation,
    Megjegyzés: body.message,
  });

  return NextResponse.json({ ok: true, message: "A jelentkezésedet megkaptuk, hamarosan jelentkezünk." });
}
