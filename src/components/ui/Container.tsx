import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-page", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "cream" | "white" | "ink" | "sage";
}) {
  const tones: Record<string, string> = {
    cream: "bg-cream-200",
    white: "bg-white",
    ink: "bg-ink-900 text-cream-100",
    sage: "bg-sage-800 text-cream-100",
  };
  return (
    <section id={id} className={cn("py-16 sm:py-24", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-marmalade-600",
        className
      )}
    >
      {children}
    </p>
  );
}
