"use client";

import { useState } from "react";

/**
 * Egyetlen kép feltöltésére/cseréjére/eltávolítására szolgáló mező admin
 * űrlapokhoz (pl. támogatói logó vagy kép). A `name` mezőnév lesz a
 * fájlmező neve; a szerver oldali mentéshez ehhez tartozik még két rejtett
 * mező: `${name}CurrentUrl` (a jelenlegi kép URL-je) és `${name}Removed`
 * ("true"/"false", ha a felhasználó eltávolította a képet mentés nélküli
 * új feltöltés helyett).
 */
export function SingleImageDropzone({
  name,
  currentUrl,
  label,
  hint,
}: {
  name: string;
  currentUrl?: string;
  label?: string;
  hint?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);

  const displayUrl = preview ?? (removed ? null : currentUrl || null);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <p className="text-sm font-semibold text-ink-800">{label}</p>}
      <div className="flex items-center gap-4">
        {displayUrl ? (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ink-100 bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={displayUrl} alt="" className="h-full w-full object-contain" />
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-ink-200 text-center text-[0.65rem] text-ink-300">
            Nincs kép
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <input
            name={name}
            type="file"
            accept="image/*"
            className="text-xs text-ink-600"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setPreview(file ? URL.createObjectURL(file) : null);
              if (file) setRemoved(false);
            }}
          />
          {currentUrl && !removed && !preview && (
            <button
              type="button"
              onClick={() => setRemoved(true)}
              className="focus-ring self-start text-xs font-semibold text-blush-500 underline-offset-2 hover:underline"
            >
              Kép eltávolítása
            </button>
          )}
          {hint && <p className="text-xs text-ink-300">{hint}</p>}
        </div>
      </div>
      <input type="hidden" name={`${name}CurrentUrl`} value={currentUrl ?? ""} />
      <input type="hidden" name={`${name}Removed`} value={removed ? "true" : "false"} />
    </div>
  );
}
