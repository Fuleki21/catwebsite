import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Szerveroldali admin kliens — a service role kulcs megkerüli az RLS-t,
 * vagyis ez tud írni (insert/update/delete) az adatbázisba és a Storage-ba.
 *
 * FONTOS: soha ne importáld "use client" komponensbe, és ne küldd el a
 * böngészőnek. Csak Server Action / Route Handler fájlokban használd.
 */
export function getSupabaseAdmin() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Hiányzik a NEXT_PUBLIC_SUPABASE_URL vagy a SUPABASE_SERVICE_ROLE_KEY env változó — " +
        "az admin felület nem tud írni az adatbázisba."
    );
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
