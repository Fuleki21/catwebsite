import Image from "next/image";
import { cn } from "@/lib/utils";
import { PlaceholderImage } from "./PlaceholderImage";

export function isRealImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

/**
 * Egy konkrét kép megjelenítése: ha a `src` valós (feltöltött) fotó URL-je,
 * akkor `next/image`-dzsel jelenik meg, egyébként a `PlaceholderImage`
 * márkaszínes helyőrzőjét mutatja (a `src` értékét seedként használva).
 */
export function ImageTile({
  src,
  aspect = "aspect-[4/5]",
  className,
  label,
  priority,
}: {
  src: string;
  aspect?: string;
  className?: string;
  label?: string;
  priority?: boolean;
}) {
  if (!isRealImage(src)) {
    return <PlaceholderImage seed={src} aspect={aspect} className={className} label={label} />;
  }
  return (
    <div className={cn("relative overflow-hidden rounded-xl2 bg-cream-200", aspect, className)}>
      <Image
        src={src}
        alt={label ?? ""}
        fill
        sizes="(min-width: 1024px) 500px, 100vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}

/**
 * Kártyákhoz: az adott `images` tömb első valós fotóját mutatja, ha van;
 * ha nincs feltöltött fotó, a `seed` alapján helyőrzőt jelenít meg.
 */
export function CoverTile({
  images,
  seed,
  aspect = "aspect-[4/3]",
  className,
  label,
}: {
  images: string[];
  seed: string;
  aspect?: string;
  className?: string;
  label?: string;
}) {
  const real = images.find(isRealImage);
  if (!real) {
    return <PlaceholderImage seed={seed} aspect={aspect} className={className} label={label} />;
  }
  return <ImageTile src={real} aspect={aspect} className={className} label={label} />;
}
