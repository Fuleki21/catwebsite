import { getSupabaseAdmin } from "./supabaseAdmin";

const BUCKET = "photos";

function slugifyFileName(name: string) {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const base = name
    .slice(0, name.length - ext.length)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "kep"}${ext.toLowerCase()}`;
}

/**
 * Feltölti a megadott fájlokat a Supabase Storage "photos" bucketjébe, a
 * megadott mappa (pl. "cats/morzsa") alá, és visszaadja a publikus URL-eket.
 */
export async function uploadPhotos(files: File[], folder: string): Promise<string[]> {
  const admin = getSupabaseAdmin();
  const urls: string[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${slugifyFileName(file.name)}`;
    const arrayBuffer = await file.arrayBuffer();
    const { error } = await admin.storage.from(BUCKET).upload(path, arrayBuffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
    if (error) {
      console.error("[uploadPhotos] feltöltési hiba:", error.message);
      continue;
    }
    const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

/** Törli a megadott publikus URL-ekhez tartozó fájlokat a Storage-ból. */
export async function deletePhotos(urls: string[]) {
  if (urls.length === 0) return;
  const admin = getSupabaseAdmin();
  const marker = `/object/public/${BUCKET}/`;
  const paths = urls
    .map((url) => {
      const idx = url.indexOf(marker);
      return idx >= 0 ? url.slice(idx + marker.length) : null;
    })
    .filter((p): p is string => Boolean(p));

  if (paths.length === 0) return;
  const { error } = await admin.storage.from(BUCKET).remove(paths);
  if (error) console.error("[deletePhotos] törlési hiba:", error.message);
}
