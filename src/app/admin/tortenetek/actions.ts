"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { uploadPhotos, deletePhotos } from "@/lib/uploadPhotos";
import { RescueStory } from "@/data/types";

type FormState = { error?: string };

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseCsv(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildRowFromForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || title);
  const catSlug = String(formData.get("catSlug") ?? "").trim();

  const content = String(formData.get("content") ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    title,
    slug,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content,
    cat_slug: catSlug || null,
    date: String(formData.get("date") ?? "").trim() || new Date().toISOString().slice(0, 10),
    featured: formData.get("featured") === "on",
    stage: String(formData.get("stage") ?? "utcarol") as RescueStory["stage"],
  };
}

function revalidateStoryPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/mentesek");
  revalidatePath(`/mentesek/${slug}`);
  revalidatePath("/admin/tortenetek");
  revalidatePath("/sitemap.xml");
}

export async function createStory(prevState: FormState, formData: FormData): Promise<FormState> {
  const row = buildRowFromForm(formData);
  if (!row.title) return { error: "A cím megadása kötelező." };
  if (!row.slug) return { error: "Nem sikerült egyedi azonosítót képezni a címből. Adj meg egyet kézzel." };

  const admin = getSupabaseAdmin();
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  const uploaded = files.length > 0 ? await uploadPhotos(files, `stories/${row.slug}`) : [];

  const { error } = await admin.from("stories").insert({ ...row, images: uploaded });
  if (error) {
    if (error.code === "23505") {
      return { error: "Már létezik történet ezzel az egyedi azonosítóval. Válassz másikat." };
    }
    return { error: `Hiba történt mentéskor: ${error.message}` };
  }

  revalidateStoryPaths(row.slug);
  redirect("/admin/tortenetek");
}

export async function updateStory(prevState: FormState, formData: FormData): Promise<FormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Hiányzó azonosító." };

  const row = buildRowFromForm(formData);
  if (!row.title) return { error: "A cím megadása kötelező." };
  if (!row.slug) return { error: "Nem sikerült egyedi azonosítót képezni a címből. Adj meg egyet kézzel." };

  const admin = getSupabaseAdmin();
  const existingImages = parseCsv(formData.get("existingImages"));
  const removedImages = parseCsv(formData.get("removedImages"));
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  const uploaded = files.length > 0 ? await uploadPhotos(files, `stories/${row.slug}`) : [];
  const images = [...existingImages, ...uploaded];

  const { error } = await admin.from("stories").update({ ...row, images }).eq("id", id);
  if (error) {
    if (error.code === "23505") {
      return { error: "Már létezik történet ezzel az egyedi azonosítóval. Válassz másikat." };
    }
    return { error: `Hiba történt mentéskor: ${error.message}` };
  }

  if (removedImages.length > 0) await deletePhotos(removedImages);

  revalidateStoryPaths(row.slug);
  redirect("/admin/tortenetek");
}

export async function deleteStory(id: string, slug: string, images: string[]) {
  "use server";
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("stories").delete().eq("id", id);
  if (error) {
    console.error("[deleteStory] hiba:", error.message);
    return;
  }
  if (images.length > 0) await deletePhotos(images);
  revalidateStoryPaths(slug);
}
