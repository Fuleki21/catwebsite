"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHeart, IconHome, IconMail, IconPaw, IconUsers } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Főoldal", icon: IconHome },
  { href: "/macskak", label: "Cicák", icon: IconPaw },
  { href: "/segits", label: "Segítek", icon: IconHeart },
  { href: "/onkentes", label: "Csatlakozz", icon: IconUsers },
  { href: "/kapcsolat", label: "Kapcsolat", icon: IconMail },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-100 bg-cream-100/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Mobil navigáció"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "focus-ring flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium transition-colors",
                  active ? "text-marmalade-600" : "text-ink-500"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "scale-110")} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
