import { NextResponse } from "next/server";
import { isValidEmail, requireFields } from "@/lib/validation";

// Ez a route jelenleg csak validál és visszaigazol — nincs mögötte
// adatbázis. Amint elkészül a CMS/Supabase integráció, itt kell majd
// beszúrni az "AdoptionApplication" rekordot és e-mail értesítést küldeni.
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

  return NextResponse.json({ ok: true, message: "A jelentkezésedet megkaptuk, hamarosan jelentkezünk." });
}
