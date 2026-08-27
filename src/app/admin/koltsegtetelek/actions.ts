"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type FormState = { error?: string };

function buildRow(formData: FormData) {
  return {
    label: String(formData.get("label") ?? "").trim(),
    note: String(formData.get("note") ?? "").trim(),
    position: Number(formData.get("position") ?? 0) || 0,
  };
}

function revalidateBudgetPaths() {
  revalidatePath("/");
  revalidatePath("/segits");
  revalidatePath("/admin/koltsegtetelek");
}

export async function createHelpBudgetItem(prevState: FormState, formData: FormData): Promise<FormState> {
  const row = buildRow(formData);
  if (!row.label) return { error: "A tétel nevének megadása kötelező." };

  const admin = getSupabaseAdmin();
  const { error } = await admin.from("help_budget_items").insert(row);
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  revalidateBudgetPaths();
  redirect("/admin/koltsegtetelek");
}

export async function updateHelpBudgetItem(prevState: FormState, formData: FormData): Promise<FormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Hiányzó azonosító." };

  const row = buildRow(formData);
  if (!row.label) return { error: "A tétel nevének megadása kötelező." };

  const admin = getSupabaseAdmin();
  const { error } = await admin.from("help_budget_items").update(row).eq("id", id);
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  revalidateBudgetPaths();
  redirect("/admin/koltsegtetelek");
}

export async function deleteHelpBudgetItem(id: string) {
  "use server";
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("help_budget_items").delete().eq("id", id);
  if (error) {
    console.error("[deleteHelpBudgetItem] hiba:", error.message);
    return;
  }
  revalidateBudgetPaths();
}
