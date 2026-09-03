"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IconChevronDown, IconMenu, IconPaw, IconX } from "@/components/ui/Icons";
import { LinkButton } from "@/components/ui/Button";
import { primaryNavLinks, joinDropdownLinks, secondaryNavLinks } from "./nav-links";
import { cn } from "@/lib/utils";

export function Header({ operatingArea }: { operatingArea: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/70 bg-cream-100/90 backdrop-blur-md">
      <div className="container-page flex items-center justify-between py-3">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-md" onClick={() => setMobileOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marmalade-500 text-cream-100">
            <IconPaw className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold leading-tight text-ink-900">
            Cat TNR
            <span className="block text-xs font-sans font-medium tracking-wide text-marmalade-600">Fehérvár</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "focus-ring rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900",
                pathname === link.href && "bg-ink-50 text-ink-900"
              )}
            >
              {link.label}
            </Link>
          ))}

          {secondaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "focus-ring rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900",
                pathname === link.href && "bg-ink-50 text-ink-900"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" onMouseEnter={() => setJoinOpen(true)} onMouseLeave={() => setJoinOpen(false)}>
            <button
              className="focus-ring flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900"
              aria-expanded={joinOpen}
              onClick={() => setJoinOpen((v) => !v)}
            >
              Csatlakozz
              <IconChevronDown className={cn("h-4 w-4 transition-transform", joinOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 transition-all duration-200",
                joinOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
              )}
            >
              <div className="overflow-hidden rounded-xl2 border border-ink-100 bg-white p-2 shadow-lift">
                {joinDropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="focus-ring block rounded-lg px-4 py-3 transition-colors hover:bg-cream-200"
                  >
                    <p className="text-sm font-semibold text-ink-900">{link.label}</p>
                    <p className="mt-0.5 text-xs text-ink-500">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LinkButton href="/segits" variant="outline" size="sm">
            Segítek
          </LinkButton>
          <LinkButton href="/macskak" variant="primary" size="sm">
            Örökbefogadok
          </LinkButton>
        </div>

        <button
          className="focus-ring rounded-md p-2 text-ink-900 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <IconX className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-ink-100 bg-cream-100 transition-all duration-300 lg:hidden",
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {[...primaryNavLinks, ...joinDropdownLinks, ...secondaryNavLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring rounded-lg px-3 py-3 text-sm font-medium text-ink-800 hover:bg-cream-300"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <LinkButton href="/segits" variant="outline" size="sm" className="flex-1">
                Segítek
              </LinkButton>
              <LinkButton href="/macskak" variant="primary" size="sm" className="flex-1">
                Örökbefogadok
              </LinkButton>
            </div>
            <p className="mt-3 text-xs text-ink-300">{operatingArea}</p>
          </nav>
        </div>
      </div>
    </header>
  );
}
