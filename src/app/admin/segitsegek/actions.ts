"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type FormState = { error?: string };

function buildRow(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    icon: String(formData.get("icon") ?? "").trim(),
    short_description: String(formData.get("shortDescription") ?? "").trim(),
    button_text: String(formData.get("buttonText") ?? "").trim(),
    button_url: String(formData.get("buttonUrl") ?? "").trim(),
    position: Number(formData.get("position") ?? 0) || 0,
    visible: formData.get("visible") === "on",
  };
}

function revalidateHelpCategoryPaths() {
  revalidatePath("/segits");
  revalidatePath("/admin/segitsegek");
}

export async function createHelpCategory(prevState: FormState, formData: FormData): Promise<FormState> {
  const row = buildRow(formData);
  if (!row.title) return { error: "A cím megadása kötelező." };

  const admin = getSupabaseAdmin();
  const { error } = await admin.from("help_categories").insert(row);
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  revalidateHelpCategoryPaths();
  redirect("/admin/segitsegek");
}

export async function updateHelpCategory(prevState: FormState, formData: FormData): Promise<FormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Hiányzó azonosító." };

  const row = buildRow(formData);
  if (!row.title) return { error: "A cím megadása kötelező." };

  const admin = getSupabaseAdmin();
  const { error } = await admin.from("help_categories").update(row).eq("id", id);
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  revalidateHelpCategoryPaths();
  redirect("/admin/segitsegek");
}

export async function deleteHelpCategory(id: string) {
  "use server";
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("help_categories").delete().eq("id", id);
  if (error) {
    console.error("[deleteHelpCategory] hiba:", error.message);
    return;
  }
  revalidateHelpCategoryPaths();
}

export async function toggleHelpCategoryVisibility(id: string, nextVisible: boolean) {
  "use server";
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("help_categories").update({ visible: nextVisible }).eq("id", id);
  if (error) {
    console.error("[toggleHelpCategoryVisibility] hiba:", error.message);
    return;
  }
  revalidateHelpCategoryPaths();
}
