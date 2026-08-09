import { cn } from "@/lib/utils";
import { CatStatus } from "@/data/types";

export function Badge({
  children,
  tone = "marmalade",
  className,
}: {
  children: React.ReactNode;
  tone?: "marmalade" | "sage" | "ink" | "blush" | "cream";
  className?: string;
}) {
  const tones: Record<string, string> = {
    marmalade: "bg-marmalade-100 text-marmalade-700",
    sage: "bg-sage-100 text-sage-700",
    ink: "bg-ink-100 text-ink-700",
    blush: "bg-blush-100 text-blush-500",
    cream: "bg-cream-300 text-ink-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

const statusMap: Record<CatStatus, { label: string; tone: "sage" | "marmalade" | "ink" }> = {
  gazdit_keres: { label: "Gazdit keres", tone: "sage" },
  foglalt: { label: "Foglalt", tone: "marmalade" },
  orokbefogadva: { label: "Örökbefogadva", tone: "ink" },
};

export function StatusBadge({ status }: { status: CatStatus }) {
  const info = statusMap[status];
  return (
    <Badge tone={info.tone} className="shadow-sm backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {info.label}
    </Badge>
  );
}

export function PlaceholderBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-dashed border-marmalade-400 bg-marmalade-50 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-marmalade-600",
        className
      )}
      title="Ez egy helyőrző adat — cseréld valós tartalomra."
    >
      Placeholder
    </span>
  );
}
