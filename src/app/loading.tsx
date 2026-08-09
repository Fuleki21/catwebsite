import { IconPaw } from "@/components/ui/Icons";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-ink-300">
      <IconPaw className="h-8 w-8 animate-pulse" />
      <p className="text-sm">Betöltés...</p>
    </div>
  );
}
