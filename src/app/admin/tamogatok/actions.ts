"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { uploadPhotos, deletePhotos } from "@/lib/uploadPhotos";

type FormState = { error?: string };

/**
 * Egy SingleImageDropzone mező (pl. "logo" vagy "image") feldolgozása:
 * ha érkezett új fájl, feltölti és törli a régit; ha a felhasználó
 * eltávolította a képet, törli a régit és üres string marad; egyébként
 * a jelenlegi URL-t tartja meg változatlanul.
 */
async function resolveImage(formData: FormData, fieldName: string, folder: string): Promise<string> {
  const currentUrl = String(formData.get(`${fieldName}CurrentUrl`) ?? "").trim();
  const removed = formData.get(`${fieldName}Removed`) === "true";
  const file = formData.get(fieldName);

  if (file instanceof File && file.size > 0) {
    const [uploadedUrl] = await uploadPhotos([file], folder);
    if (currentUrl) await deletePhotos([currentUrl]);
    return uploadedUrl ?? "";
  }

  if (removed) {
    if (currentUrl) await deletePhotos([currentUrl]);
    return "";
  }

  return currentUrl;
}

async function buildRow(formData: FormData) {
  const logoUrl = await resolveImage(formData, "logo", "sponsors");
  const imageUrl = await resolveImage(formData, "image", "sponsors");

  return {
    name: String(formData.get("name") ?? "").trim(),
    logo_url: logoUrl,
    image_url: imageUrl,
    short_bio: String(formData.get("shortBio") ?? "").trim(),
    support_type: String(formData.get("supportType") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    referral_url: String(formData.get("referralUrl") ?? "").trim(),
    referral_button_text: String(formData.get("referralButtonText") ?? "").trim(),
    website_url: String(formData.get("websiteUrl") ?? "").trim(),
    facebook_url: String(formData.get("facebookUrl") ?? "").trim(),
    position: Number(formData.get("position") ?? 0) || 0,
    visible: formData.get("visible") === "on",
  };
}

function revalidateSponsorPaths() {
  revalidatePath("/tamogatoink");
  revalidatePath("/admin/tamogatok");
}

export async function createSponsor(prevState: FormState, formData: FormData): Promise<FormState> {
  const row = await buildRow(formData);
  if (!row.name) return { error: "A támogató nevének megadása kötelező." };

  const admin = getSupabaseAdmin();
  const { error } = await admin.from("sponsors").insert(row);
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  revalidateSponsorPaths();
  redirect("/admin/tamogatok");
}

export async function updateSponsor(prevState: FormState, formData: FormData): Promise<FormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Hiányzó azonosító." };

  const row = await buildRow(formData);
  if (!row.name) return { error: "A támogató nevének megadása kötelező." };

  const admin = getSupabaseAdmin();
  const { error } = await admin.from("sponsors").update(row).eq("id", id);
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  revalidateSponsorPaths();
  redirect("/admin/tamogatok");
}

export async function deleteSponsor(id: string, logoUrl: string, imageUrl: string) {
  "use server";
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("sponsors").delete().eq("id", id);
  if (error) {
    console.error("[deleteSponsor] hiba:", error.message);
    return;
  }
  const urls = [logoUrl, imageUrl].filter(Boolean);
  if (urls.length > 0) await deletePhotos(urls);
  revalidateSponsorPaths();
}

export async function toggleSponsorVisibility(id: string, nextVisible: boolean) {
  "use server";
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("sponsors").update({ visible: nextVisible }).eq("id", id);
  if (error) {
    console.error("[toggleSponsorVisibility] hiba:", error.message);
    return;
  }
  revalidateSponsorPaths();
}
