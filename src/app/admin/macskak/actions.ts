"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { uploadPhotos, deletePhotos } from "@/lib/uploadPhotos";
import { CatGender, CatStatus, CatTemperament } from "@/data/types";

type FormState = { error?: string };

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseTriBool(value: string): boolean | null {
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

function parseCsv(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildRowFromForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || name);

  return {
    name,
    slug,
    age_label: String(formData.get("ageLabel") ?? "").trim(),
    age_months_approx: Number(formData.get("ageMonthsApprox") ?? 0) || 0,
    gender: String(formData.get("gender") ?? "nőstény") as CatGender,
    neutered: formData.get("neutered") === "on",
    vaccinated: formData.get("vaccinated") === "on",
    chipped: formData.get("chipped") === "on",
    indoor_only: formData.get("indoorOnly") === "on",
    good_with_children: parseTriBool(String(formData.get("goodWithChildren") ?? "ismeretlen")),
    good_with_cats: parseTriBool(String(formData.get("goodWithCats") ?? "ismeretlen")),
    good_with_dogs: parseTriBool(String(formData.get("goodWithDogs") ?? "ismeretlen")),
    temperament: parseCsv(formData.get("temperament")) as CatTemperament[],
    status: String(formData.get("status") ?? "gazdit_keres") as CatStatus,
    featured: formData.get("featured") === "on",
    short_description: String(formData.get("shortDescription") ?? "").trim(),
    story: String(formData.get("story") ?? "").trim(),
    health: String(formData.get("health") ?? "").trim(),
    seeking_home: String(formData.get("seekingHome") ?? "").trim(),
    arrival_date: String(formData.get("arrivalDate") ?? "").trim() || new Date().toISOString().slice(0, 10),
  };
}

function revalidateCatPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/macskak");
  revalidatePath(`/macskak/${slug}`);
  revalidatePath("/orokbefogadas");
  revalidatePath("/admin/macskak");
  revalidatePath("/sitemap.xml");
}

export async function createCat(prevState: FormState, formData: FormData): Promise<FormState> {
  const row = buildRowFromForm(formData);
  if (!row.name) return { error: "A név megadása kötelező." };
  if (!row.slug) return { error: "Nem sikerült egyedi azonosítót képezni a névből. Adj meg egyet kézzel." };

  const admin = getSupabaseAdmin();
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  const uploaded = files.length > 0 ? await uploadPhotos(files, `cats/${row.slug}`) : [];

  const { error } = await admin.from("cats").insert({ ...row, images: uploaded });
  if (error) {
    if (error.code === "23505") {
      return { error: "Már létezik cica ezzel az egyedi azonosítóval. Válassz másikat." };
    }
    return { error: `Hiba történt mentéskor: ${error.message}` };
  }

  revalidateCatPaths(row.slug);
  redirect("/admin/macskak");
}

export async function updateCat(prevState: FormState, formData: FormData): Promise<FormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Hiányzó azonosító." };

  const row = buildRowFromForm(formData);
  if (!row.name) return { error: "A név megadása kötelező." };
  if (!row.slug) return { error: "Nem sikerült egyedi azonosítót képezni a névből. Adj meg egyet kézzel." };

  const admin = getSupabaseAdmin();

  const existingImages = parseCsv(formData.get("existingImages"));
  const removedImages = parseCsv(formData.get("removedImages"));
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  const uploaded = files.length > 0 ? await uploadPhotos(files, `cats/${row.slug}`) : [];
  const images = [...existingImages, ...uploaded];

  const { error } = await admin.from("cats").update({ ...row, images }).eq("id", id);
  if (error) {
    if (error.code === "23505") {
      return { error: "Már létezik cica ezzel az egyedi azonosítóval. Válassz másikat." };
    }
    return { error: `Hiba történt mentéskor: ${error.message}` };
  }

  if (removedImages.length > 0) await deletePhotos(removedImages);

  revalidateCatPaths(row.slug);
  redirect("/admin/macskak");
}

export async function deleteCat(id: string, slug: string, images: string[]) {
  "use server";
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("cats").delete().eq("id", id);
  if (error) {
    console.error("[deleteCat] hiba:", error.message);
    return;
  }
  if (images.length > 0) await deletePhotos(images);
  revalidateCatPaths(slug);
}
