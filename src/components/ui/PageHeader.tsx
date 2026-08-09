import { ReactNode } from "react";
import { Container, Eyebrow } from "./Container";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  tone = "cream",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: "cream" | "ink";
}) {
  return (
    <section className={cn("pb-14 pt-14 sm:pb-16 sm:pt-20", tone === "ink" ? "bg-ink-900 text-cream-100" : "bg-cream-200")}>
      <Container>
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow className={tone === "ink" ? "text-marmalade-300" : undefined}>{eyebrow}</Eyebrow>}
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          {description && (
            <p className={cn("mt-5 text-lg leading-relaxed", tone === "ink" ? "text-cream-100/75" : "text-ink-500")}>
              {description}
            </p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
