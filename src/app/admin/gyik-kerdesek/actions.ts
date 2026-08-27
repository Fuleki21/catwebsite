"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type FormState = { error?: string };

function buildRow(formData: FormData) {
  return {
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    position: Number(formData.get("position") ?? 0) || 0,
    show_in_adoption_page: formData.get("showInAdoptionPage") === "on",
  };
}

function revalidateFaqPaths() {
  revalidatePath("/gyik");
  revalidatePath("/orokbefogadas");
  revalidatePath("/admin/gyik-kerdesek");
}

export async function createFaqItem(prevState: FormState, formData: FormData): Promise<FormState> {
  const row = buildRow(formData);
  if (!row.question) return { error: "A kérdés megadása kötelező." };

  const admin = getSupabaseAdmin();
  const { error } = await admin.from("faq_items").insert(row);
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  revalidateFaqPaths();
  redirect("/admin/gyik-kerdesek");
}

export async function updateFaqItem(prevState: FormState, formData: FormData): Promise<FormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Hiányzó azonosító." };

  const row = buildRow(formData);
  if (!row.question) return { error: "A kérdés megadása kötelező." };

  const admin = getSupabaseAdmin();
  const { error } = await admin.from("faq_items").update(row).eq("id", id);
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  revalidateFaqPaths();
  redirect("/admin/gyik-kerdesek");
}

export async function deleteFaqItem(id: string) {
  "use server";
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("faq_items").delete().eq("id", id);
  if (error) {
    console.error("[deleteFaqItem] hiba:", error.message);
    return;
  }
  revalidateFaqPaths();
}
