"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { uploadPhotos, deletePhotos } from "@/lib/uploadPhotos";

type FormState = { error?: string; ok?: boolean };

const QR_KEY = "segits.repont.qr_image_url";

/**
 * Egyedi mentő action a REPONT QR-kód képéhez — külön a többi (szöveges)
 * content_blocks mezőtől, mert ez fájlfeltöltést igényel. Ugyanabba a
 * content_blocks táblába ír, csak a value ezúttal egy kép URL.
 */
export async function saveRepontQrImage(prevState: FormState, formData: FormData): Promise<FormState> {
  const file = formData.get("qrImage");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Válassz ki egy képfájlt a feltöltéshez." };
  }

  const admin = getSupabaseAdmin();

  const previousUrl = String(formData.get("previousUrl") ?? "").trim();
  const [uploadedUrl] = await uploadPhotos([file], "content/repont");
  if (!uploadedUrl) return { error: "Hiba történt a kép feltöltésekor." };

  const { error } = await admin.from("content_blocks").upsert({ key: QR_KEY, value: uploadedUrl }, { onConflict: "key" });
  if (error) return { error: `Hiba történt mentéskor: ${error.message}` };

  if (previousUrl) await deletePhotos([previousUrl]);

  revalidatePath("/segits");
  revalidatePath("/admin/tartalom/segits");
  return { ok: true };
}
