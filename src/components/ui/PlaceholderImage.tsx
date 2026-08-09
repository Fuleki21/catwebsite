import { cn } from "@/lib/utils";
import { IconCatFace } from "./Icons";

const gradients = [
  "from-marmalade-200 via-marmalade-100 to-cream-300",
  "from-sage-200 via-sage-100 to-cream-300",
  "from-blush-100 via-cream-300 to-marmalade-100",
  "from-cream-400 via-marmalade-100 to-sage-100",
];

function hashToIndex(seed: string, mod: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 997;
  }
  return Math.abs(hash) % mod;
}

/**
 * Vizuálisan igényes helyőrző a valós cicafotók helyén.
 * A projekt architektúrája `next/image`-re és valós feltöltött
 * képekre (pl. Supabase Storage) van felkészítve — ha a `src` mezőt
 * kitöltik valós URL-lel, ez a komponens könnyen lecserélhető
 * `<Image src={src} .../>`-re.
 */
export function PlaceholderImage({
  seed,
  className,
  aspect = "aspect-[4/5]",
  label,
}: {
  seed: string;
  className?: string;
  aspect?: string;
  label?: string;
}) {
  const gradient = gradients[hashToIndex(seed, gradients.length)];
  return (
    <div
      className={cn(
        "paw-divider relative flex items-center justify-center overflow-hidden rounded-xl2 bg-gradient-to-br",
        gradient,
        aspect,
        className
      )}
      role="img"
      aria-label={label ?? "Cica fotó helye"}
    >
      <IconCatFace className="h-1/3 w-1/3 max-h-24 max-w-24 text-ink-900/25" />
      <span className="absolute bottom-2 right-2 rounded-md bg-ink-900/60 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-cream-100">
        Fotó helye
      </span>
    </div>
  );
}
