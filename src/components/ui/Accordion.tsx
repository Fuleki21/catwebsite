"use client";

import { useState } from "react";
import { FaqItem } from "@/data/types";
import { IconChevronDown } from "./Icons";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-100 rounded-xl2 border border-ink-100 bg-white shadow-card">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-display text-base font-medium text-ink-900 sm:text-lg">
                {item.question}
              </span>
              <IconChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-marmalade-500 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden px-5 pb-5 text-ink-500 sm:px-7">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
