import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabase] Hiányzik a NEXT_PUBLIC_SUPABASE_URL vagy a NEXT_PUBLIC_SUPABASE_ANON_KEY env változó — " +
      "az oldal egyelőre nem tud adatot olvasni a Supabase-ből."
  );
}

// Publikus, csak-olvasható kliens. Böngészőben is biztonságos, mert az anon
// kulcs csak azt engedi meg, amit az RLS policy-k (lásd supabase/schema.sql)
// kifejezetten megengednek — jelen esetben: mindenki olvashat, senki sem írhat.
export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
  auth: { persistSession: false },
});
