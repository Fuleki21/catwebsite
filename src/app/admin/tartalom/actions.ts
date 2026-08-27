"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type FormState = { error?: string; ok?: boolean };

export async function saveContentBlocks(prevState: FormState, formData: FormData): Promise<FormState> {
  const admin = getSupabaseAdmin();

  const rows = Array.from(formData.entries())
    .filter(([key]) => key.includes("."))
    .map(([key, value]) => ({ key, value: String(value ?? "") }));

  if (rows.length === 0) return { error: "Nincs menthető mező." };

  const { error } = await admin.from("content_blocks").upsert(rows, { onConflict: "key" });
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  // A tartalom szinte bármelyik oldalon felbukkanhat, ezért az egész oldalt frissítjük.
  revalidatePath("/", "layout");
  return { ok: true };
}
