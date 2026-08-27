"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fotófeltöltő mező admin űrlapokhoz: drag-and-drop + tallózás, meglévő
 * (már feltöltött) fotók előnézete törlés-lehetőséggel, és az újonnan
 * kiválasztott fájlok előnézete. Önállóan kezeli az állapotát, és a
 * szerver oldali mentéshez szükséges rejtett mezőket (existingImages,
 * removedImages) is ő maga rendereli — a `photos` fájlmezővel együtt ez a
 * három mező tartalmazza a teljes fotó-állapotot beküldéskor.
 */
export function PhotoDropzone({ initialImages }: { initialImages: string[] }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [existingImages, setExistingImages] = useState<string[]>(initialImages);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  function syncInput(files: File[]) {
    if (!inputRef.current) return;
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    inputRef.current.files = dt.files;
  }

  function addFiles(incoming: FileList | File[]) {
    const merged = [...newFiles, ...Array.from(incoming)];
    setNewFiles(merged);
    syncInput(merged);
  }

  function removeNewFile(index: number) {
    const remaining = newFiles.filter((_, i) => i !== index);
    setNewFiles(remaining);
    syncInput(remaining);
  }

  function removeExisting(url: string) {
    setExistingImages((prev) => prev.filter((u) => u !== url));
    setRemovedImages((prev) => [...prev, url]);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={cn(
          "cursor-pointer rounded-xl2 border-2 border-dashed p-6 text-center transition-colors",
          dragOver ? "border-marmalade-400 bg-marmalade-50" : "border-ink-200 hover:border-marmalade-300"
        )}
      >
        <p className="text-sm text-ink-500">
          Húzz ide fotókat, vagy <span className="font-semibold text-marmalade-600">kattints a tallózáshoz</span>
        </p>
        <input
          ref={inputRef}
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {(existingImages.length > 0 || newFiles.length > 0) && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {existingImages.map((url) => (
            <div key={url} className="relative aspect-square overflow-hidden rounded-lg border border-ink-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeExisting(url)}
                className="focus-ring absolute right-1 top-1 rounded-full bg-ink-900/70 px-2 py-0.5 text-xs text-white"
                aria-label="Fotó törlése"
              >
                ✕
              </button>
            </div>
          ))}
          {newFiles.map((file, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-sage-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeNewFile(i)}
                className="focus-ring absolute right-1 top-1 rounded-full bg-ink-900/70 px-2 py-0.5 text-xs text-white"
                aria-label="Fotó eltávolítása"
              >
                ✕
              </button>
              <span className="absolute bottom-1 left-1 rounded bg-sage-600/90 px-1.5 py-0.5 text-[0.6rem] font-semibold text-white">
                Új
              </span>
            </div>
          ))}
        </div>
      )}

      <input type="hidden" name="existingImages" value={existingImages.join(",")} />
      <input type="hidden" name="removedImages" value={removedImages.join(",")} />
    </div>
  );
}
