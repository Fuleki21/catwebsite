"use client";

import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { saveRepontQrImage } from "@/app/admin/tartalom/segits/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring self-start rounded-full bg-marmalade-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-marmalade-600 disabled:opacity-60"
    >
      {pending ? "Feltöltés…" : "QR-kód feltöltése / cseréje"}
    </button>
  );
}

export function RepontQrUpload({ currentUrl }: { currentUrl: string }) {
  const [state, formAction] = useFormState(saveRepontQrImage, {});
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div className="rounded-xl2 border border-ink-100 bg-cream-200 p-5">
      <p className="text-sm font-semibold text-ink-800">REPONT QR-kód kép</p>
      <p className="mt-1 text-xs text-ink-400">
        Ez a kép jelenik meg a Segíts oldal REPONT szekciójában, „2. lépés” alatt. Töltsd fel képként (pl. JPG vagy
        PNG), miután letöltötted vagy lefotóztad a REPONT-ban generált QR-kódot.
      </p>

      {(previewUrl || currentUrl) && (
        <div className="mt-4 h-40 w-40 overflow-hidden rounded-lg border border-ink-100 bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl ?? currentUrl} alt="REPONT QR-kód" className="h-full w-full object-contain" />
        </div>
      )}
      {!currentUrl && !previewUrl && (
        <p className="mt-4 text-xs italic text-ink-400">Még nincs feltöltve QR-kód kép.</p>
      )}

      <form action={formAction} className="mt-4 flex flex-col gap-3">
        <input type="hidden" name="previousUrl" value={currentUrl} />
        <input
          ref={inputRef}
          name="qrImage"
          type="file"
          accept="image/*"
          className="focus-ring w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setPreviewUrl(file ? URL.createObjectURL(file) : null);
          }}
        />
        {state.error && (
          <p className="rounded-lg bg-blush-50 px-4 py-3 text-sm font-medium text-blush-600" role="alert">
            {state.error}
          </p>
        )}
        {state.ok && (
          <p className="rounded-lg bg-sage-50 px-4 py-3 text-sm font-medium text-sage-700" role="status">
            Elmentve — a Segíts oldalon már az új kép látszik.
          </p>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}
